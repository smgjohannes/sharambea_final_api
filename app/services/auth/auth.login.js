const db = require('../../models');
const {
  NotFoundError,
  PasswordNotMatchingError,
} = require('../../utils/coreErrors');

async function login(payload) {
  const { identity, password, ip, useragent } = payload;

  // get user from auth id login identity
  let user = await db.User.findOne({
    where: {
      email: identity,
    },
  });

  if (user === null) {
    // log unsuccessful login
    await db.Login.create({
      ip_address: ip,
      identity: identity,
      user_agent: useragent,
      success: 0,
      timestamp: Date.now() + 60 * 15 * 1000,
    });

    throw new NotFoundError('Invalid login credentials');
  }

  // // check if email already verified
  // if (!user.email_verified_at) {
  //   requireVerification = true
  // }

  // verify current password
  const passwordMatches = await auth.compareHash(password);
  if (passwordMatches !== true) {
    // log unsuccessful login
    await db.Login.create({
      ip_address: ip,
      identity: identity,
      user_agent: useragent,
      success: 0,
      timestamp: Date.now() + 60 * 15 * 1000,
    });
    throw new PasswordNotMatchingError();
  }

  // log successful login
  await db.Login.create({
    ip_address: ip,
    identity: identity,
    user_agent: useragent,
    success: 1,
    timestamp: Date.now() + 60 * 15 * 1000,
  });

  return { user };
}

module.exports = { login };
