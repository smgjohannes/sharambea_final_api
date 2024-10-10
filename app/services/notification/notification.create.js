const db = require('../../models');

async function createNotification(data) {
  const createdNotification = await db.Notification.create(data);
  return createdNotification;
}

module.exports = { createNotification };
