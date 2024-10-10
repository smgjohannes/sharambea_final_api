const { create } = require('./interestedbuyer.create');
const { get } = require('./interestedbuyer.get');
const { getById } = require('./interestedbuyer.getById');
const { update } = require('./interestedbuyer.update');
const { destroy } = require('./interestedbuyer.destroy');

class Interestedbuyer {
  constructor(image) {
    this.image = image;
  }
}

Interestedbuyer.prototype.get = get;
Interestedbuyer.prototype.getById = getById;
Interestedbuyer.prototype.create = create;
Interestedbuyer.prototype.update = update;
Interestedbuyer.prototype.destroy = destroy;

module.exports = Interestedbuyer;
