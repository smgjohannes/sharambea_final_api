const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @private
 * @description This function return a member by id
 * @name app.members.getById
 * @param {string} id - The id of the member.
 * @returns {Promise} Promise.
 * @example
 * await app.members.getById('6b9bc8b7-b98d-4dda-b0fd-88fc10bd0b00');
 *
 */
async function getById(id) {
  const member = await db.Member.findOne({
    where: { id },
    include: {
      model: db.Image,
      attributes: ['id', 'name', 'url'],
    },
  });

  if (member === null) {
    throw new NotFoundError(`Member not found`);
  }

  return member;
}

module.exports = {
  getById,
};
