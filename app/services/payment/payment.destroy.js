const db = require('../../models');

async function destroy(id, res) {
  const payment = await db.Payment.findByPk(id);

  if (payment === null) {
    throw new Error('payment not found');
  }

  await payment.destroy();
}

module.exports = {
  destroy,
};
