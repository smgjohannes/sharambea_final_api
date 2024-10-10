const db = require('../../models');
const passwordUtils = require('../../utils/password');
const {
  NotFoundError,
  BadParameters,
  PasswordNotMatchingError,
} = require('../../utils/coreErrors');
const { Error403, Error400 } = require('../../utils/httpErrors');

async function updatePassword(userId, formData) {
  const user = await db.User.findByPk(userId);

  if (user === null) {
    throw new NotFoundError('Account not found!');
  }

  const { currentPassword, password } = formData;

  if (!password) {
    throw new BadParameters('The password is required');
  }

  // verify current password
  const passwordMatches = await user.compareHash(currentPassword);
  if (passwordMatches !== true) {
    throw new PasswordNotMatchingError('Current password is wrong');
  }

  // hash password
  const hashedPassword = await passwordUtils.hash(password);

  // save password
  await user.update({ password: hashedPassword });

  const plainUser = user.get({ plain: true });

  // destroy all auth tokens
  const tokens = await db.Token.find({
    where: { user_id: plainUser.id, revoked: 0 },
  });

  if (tokens) {
    tokens.map((t) => t.destroy());
  }

  return {
    id: userId,
  };
}

module.exports = {
  updatePassword,
};
