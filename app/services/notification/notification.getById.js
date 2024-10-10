const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @private
 * @description This function return a interestedBuyer by id
 * @name app.interestedBuyers.getById
 * @param {string} id - The id of the interestedBuyer.
 * @returns {Promise} Promise.
 * @example
 * await app.interestedBuyers.getById('6b9bc8b7-b98d-4dda-b0fd-88fc10bd0b00');
 *
 */
async function getById(id) {
  const interestedBuyer = await db.InterestedBuyers.findOne({
    where: { id },
    include: {
      model: db.Image,
      attributes: ['id', 'name', 'url'],
    },
  });

  if (interestedBuyer === null) {
    throw new NotFoundError(`interestedBuyer not found`);
  }

  return interestedBuyer;
}

module.exports = {
  getById,
};
