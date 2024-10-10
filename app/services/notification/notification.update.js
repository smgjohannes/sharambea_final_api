const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

async function updateNotification(id, data) {
  const notification = await db.Notification.findByPk(id);

  if (!notification) {
    throw new NotFoundError('Notification not found');
  }

  const updatedNotification = await notification.update(data);
  return updatedNotification;
}

module.exports = { updateNotification };
