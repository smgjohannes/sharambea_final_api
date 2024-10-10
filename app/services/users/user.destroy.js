const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @private
 * @description This function delete a user in DB and in state.
 * @name app.user.getById
 * @param {string} id - The id of the user.
 * @returns {Promise} Promise.
 * @example
 * await app.user.destroy('xxxx');
 *
 */
async function destroy(id, req) {
  if (!req.user || (req.user.role !== 'admin' && req.user.id !== id)) {
    throw new Error('Unauthorized');
  }

  const user = await db.User.findByPk(id);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  await user.destroy();
  return { deleted: true };
}

module.exports = {
  destroy,
};
