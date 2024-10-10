const asyncMiddleware = require('../middleware/asyncMiddleware');

module.exports = function notificationController(app) {
  async function create(req, res) {
    const notification = await app.notifications.createNotification(req.body);
    res.status(201).json(notification);
  }

  async function get(req, res) {
    const notifications = await app.notifications.getNotifications(req.query);
    res.json(notifications);
  }

  async function update(req, res) {
    const updatedNotification = await app.notifications.updateNotification(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedNotification);
  }

  async function destroy(req, res) {
    await app.notifications.deleteNotification(req.params.id);
    res.status(200).json({ message: 'Notification deleted successfully' });
  }

  return Object.freeze({
    create: asyncMiddleware(create),
    get: asyncMiddleware(get),
    update: asyncMiddleware(update),
    destroy: asyncMiddleware(destroy),
  });
};
