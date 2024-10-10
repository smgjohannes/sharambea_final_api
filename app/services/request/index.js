const { create } = require('./request.create');
const { get } = require('./request.get');
const { getById } = require('./request.getById');
const { update } = require('./request.update');
const { destroy } = require('./request.destroy');

class Request {
  constructor(image) {
    this.image = image;
  }
}

Request.prototype.get = get;
Request.prototype.getById = getById;
Request.prototype.create = create;
Request.prototype.update = update;
Request.prototype.destroy = destroy;

module.exports = Request;
