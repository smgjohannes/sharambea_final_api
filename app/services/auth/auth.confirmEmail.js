const { Op } = require('sequelize');
const crypto = require('crypto');
const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');
const { Error400 } = require('../../utils/httpErrors');
const Email = require('../../utils/email');

/**
 * @description Verifies user email.
 * @param {string} token - Token the activation token
 * @example
 * eventclub.auth.confirmEmail('xxxxxx');
 */
async function confirmEmail(token) {
  const activationToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await db.User.findOne({
    where: {
      activation_token: activationToken,
      activation_expires: {
        [Op.gt]: new Date(),
      },
    },
  });

  if (user === null) {
    throw new NotFoundError('Activation failed Or Token has expired.');
  }

  // check if email already verified
  if (user.email_verified_at) {
    throw new Error400('Email already verified!');
  }

  // activate
  await user.update({
    activation_token: null,
    activation_expires: null,
    active: 1,
    activated_at: Date.now(),
    email_verified_at: new Date(),
  });

  // send successful email activation notice
  await new Email(user.email, 'Email Confirmed', '', {
    name: user.name,
  }).sendEmail('activationSuccess');

  return { verified: true };
}

module.exports = { confirmEmail };
