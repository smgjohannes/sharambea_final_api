const db = require('../../models');
const filterObj = require('../../utils/filterObj');

async function create(payload) {
  const insertValue = filterObj(
    payload,
    'amount',
    'date',
    'reference',
    'account'
  );

  let createdPayment = await db.Payment.create(insertValue);

  const { memberId } = payload;

  if (memberId) {
    await db.MemberPayment.create({
      member_id: memberId,
      payment_id: createdPayment.id,
    });
  }

  return createdPayment;
}

module.exports = { create };
