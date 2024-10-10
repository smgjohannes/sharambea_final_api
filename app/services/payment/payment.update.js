const { where } = require('sequelize');
const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');
const filterObj = require('../../utils/filterObj');

async function update(paymentId, data) {
  const payment = await db.Payment.findByPk(paymentId);

  if (payment === null) {
    throw new NotFoundError('payment not found');
  }

  const updateValue = filterObj(data, [
    'amount',
    'date',
    'reference',
    'account',
  ]);

  const updatedPayment = await payment.update(updateValue);

  const { memberId } = data;

  if (memberId) {
    await db.MemberPayment.findOrCreate({
      where: { member_id: memberId, payment_id: paymentId },
      default: {
        member_id: memberId,
        payment_id: paymentId,
      },
    });
  }

  return updatedPayment;
}

module.exports = {
  update,
};
