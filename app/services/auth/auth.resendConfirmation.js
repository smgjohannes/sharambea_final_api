const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');
const { Error400 } = require('../../utils/httpErrors');
const Email = require('../../utils/email');
const { generateToken } = require('../../utils/generateToken');
const CLIENT_URL = process.env.CLIENT_URL;

/**
 * @description Generate a an email auth token and send it to user email.
 * @param {Object} params - params username and useragent.
 * @example
 * eventclub.auth.resendConfirmation('geraldokandonga', {});
 */
async function resendConfirmation(params) {
  const { identity } = params;
  // get user by login identity from auth
  const user = await db.User.findOne({
    where: {
      email: identity,
    },
  });

  if (user === null) {
    throw new NotFoundError('Invalid Account!');
  }

  // check if email already verified
  if (user.email_verified_at) {
    throw new Error400('Email already verified!');
  }

  // generate a auth token
  const { token, hash } = generateToken();

  // send auth token
  await new Email(user.email, 'Verify Email', '', {
    url: `${CLIENT_URL}/auth/confirm-email?token=${token}`,
    name: user.name,
  }).sendActivation();

  await user.update({
    activation_token: hash,
    activation_expires: new Date(new Date().getTime() + 10 * 60 * 1000),
  });

  return {
    requested: true,
  };
}

module.exports = { resendConfirmation };
