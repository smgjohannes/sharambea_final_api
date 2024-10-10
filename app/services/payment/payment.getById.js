const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @private
 * @description This function return a payment by id
 * @name app.payments.getById
 * @param {string} id - The id of the payment.
 * @returns {Promise} Promise.
 * @example
 * await app.payments.getById('6b9bc8b7-b98d-4dda-b0fd-88fc10bd0b00');
 *
 */
async function getById(id) {
  const payment = await db.Payment.findByPk(id);

  if (payment === null) {
    throw new NotFoundError(`payment not found`);
  }

  return payment;
}

module.exports = {
  getById,
};
