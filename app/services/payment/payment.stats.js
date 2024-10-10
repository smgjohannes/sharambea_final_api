const { Op, fn, col } = require('sequelize');
const db = require('../../models');

async function stats() {
  const accounts = [
    'Membership',
    'Pastoral Fund',
    'Contribution',
    'Building Fund',
    'Tithe',
    'Offering',
  ];

  const currentYear = new Date().getFullYear();

  const totals = await db.Payment.findAll({
    where: {
      account: accounts,
      created_at: {
        [Op.gte]: new Date(currentYear, 0, 1),
        [Op.lt]: new Date(currentYear + 1, 0, 1),
      },
    },
    attributes: [
      'account',
      [db.sequelize.fn('SUM', db.sequelize.col('amount')), 'totalAmount'],
    ],
    group: ['account'],
  });

  const statistics = totals.map((payment) => ({
    account: payment.account,
    totalAmount: parseFloat(payment.getDataValue('totalAmount')),
  }));

  return statistics;
}

module.exports = { stats };
