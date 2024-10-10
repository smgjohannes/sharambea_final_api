const db = require('../../models');
const {
  NotFoundError,
  PasswordNotMatchingError,
} = require('../../utils/coreErrors');

async function login(payload) {
  const { email, password } = payload;

  // get user from users by email
  let user = await db.User.findOne({
    where: {
      email,
    },
  });

  if (user === null) {
    throw new NotFoundError('Invalid login credentials');
  }

  // verify current password
  const passwordMatches = await user.compareHash(password);
  if (passwordMatches !== true) {
    throw new PasswordNotMatchingError();
  }

  const userPlain = user.get({ plain: true });

  return userPlain;
}

module.exports = { login };
