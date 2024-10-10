const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @description Update a user.
 * @param {string} id - The user id to update.
 * @param {object} formData - The new user.
 * @param {object} req - The request object containing the authenticated user's info.
 * @returns {Promise} Return the updated user.
 * @example
 * raceresult.user.update('184515e8-27c0-45c3-97f5-f5e7d14aecce', {
 *    name: 'Logan'
 * });
 */
async function update(id, formData, req) {
  // Check if req.user is defined
  if (!req.user) {
    throw new Error('User is not authenticated or user ID is missing');
  }

  // Ensure that only admins or the user themselves can update their account
  if (req.user.role !== 'admin' && req.user.id !== id) {
    throw new Error('Unauthorized');
  }

  const user = await db.User.findByPk(id);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  return await user.update(formData);
}

module.exports = {
  update,
};
