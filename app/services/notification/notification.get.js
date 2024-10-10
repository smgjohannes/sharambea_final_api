const db = require('../../models');

async function getNotifications(options) {
  const notifications = await db.Notification.findAll({
    where: options,
    order: [['created_at', 'DESC']],
  });
  return notifications;
}

module.exports = { getNotifications };
