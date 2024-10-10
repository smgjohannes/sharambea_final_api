const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

async function deleteNotification(id) {
  const notification = await db.Notification.findByPk(id);

  if (!notification) {
    throw new NotFoundError('Notification not found');
  }

  await notification.destroy();
  return { done: true };
}

module.exports = { deleteNotification };
