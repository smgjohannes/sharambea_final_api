const { Op } = require('sequelize');
const crypto = require('crypto');
const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');
const passwordUtils = require('../../utils/password');
const Email = require('../../utils/email');

async function resetPassword(token, password) {
  // verify the token
  const resetToken = crypto.createHash('sha256').update(token).digest('hex');

  // get user from auth with reset token
  const user = await db.User.findOne({
    where: {
      reset_hash: resetToken,
      reset_expires: {
        [Op.gt]: new Date(),
      },
    },
  });

  if (!user) {
    throw new NotFoundError('Invalid reset token or taken has expired.');
  }

  // hash password
  const passwordHash = await passwordUtils.hash(password);

  // update password
  await user.update({
    hash: passwordHash,
    reset_hash: null,
    reset_expires: null,
    reset_at: new Date(),
  });

  // delete password reset
  const passwordReset = await db.PasswordReset.findOne({
    where: { email: user.email },
  });

  await passwordReset.destroy();

  // send successful password reset notification
  await new Email(user.email, 'Password Was Reset', '', {
    name: user.name,
  }).sendPasswordChanged();

  return { done: true };
}

module.exports = { resetPassword };
