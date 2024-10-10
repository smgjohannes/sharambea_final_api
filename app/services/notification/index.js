const { create } = require('./notification.create');
const { get } = require('./notification.get');
const { getById } = require('./notification.getById');
const { update } = require('./notification.update');
const { destroy } = require('./notification.destroy');

class Notification {
  constructor(image) {
    this.image = image;
  }
}

Notification.prototype.get = get;
Notification.prototype.getById = getById;
Notification.prototype.create = create;
Notification.prototype.update = update;
Notification.prototype.destroy = destroy;

module.exports = Notification;
