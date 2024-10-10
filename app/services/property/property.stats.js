const { Op } = require('sequelize');
const db = require('../../models');

async function stats(req) {
  const property_types = ['rent', 'sell', 'buy'];
  const currentYear = new Date().getFullYear();

  const totals = await Promise.all(
    property_types.map(async (type) => {
      const count = await db.Property.count({
        where: {
          category: type,
          created_at: {
            [Op.gte]: new Date(currentYear, 0, 1),
            [Op.lt]: new Date(currentYear + 1, 0, 1),
          },
          seller_id: req.user.id,
        },
      });
      return { category: type, count };
    })
  );

  const total = totals.reduce((acc, { count }) => acc + count, 0);

  const statistics = {
    rent: totals.find((stat) => stat.category === 'rent').count || 0,
    sell: totals.find((stat) => stat.category === 'sell').count || 0,
    buy: totals.find((stat) => stat.category === 'buy').count || 0,
    total,
  };

  return statistics;
}

module.exports = { stats };
