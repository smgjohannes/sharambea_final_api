const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');
const { fields } = require('./user.fields');

/**
 * @private
 * @description This function return a user by id
 * @name app.user.getById
 * @param {string} id - The id of the user.
 * @returns {Promise} Promise.
 * @example
 * await app.user.getById('6b9bc8b7-b98d-4dda-b0fd-88fc10bd0b00');
 *
 */
async function getById(id) {
  const user = await db.User.findByPk(id, {
    attributes: fields,
  });

  if (user === null) {
    throw new NotFoundError(`User not found`);
  }

  return user.get({ plain: true });
}

module.exports = {
  getById,
};
