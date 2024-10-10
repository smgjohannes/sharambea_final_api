const { create } = require('./member.create');
const { get } = require('./member.get');
const { getById } = require('./member.getById');
const { update } = require('./member.update');
const { destroy } = require('./member.destroy');

class Member {
  constructor(image) {
    this.image = image;
  }
}

Member.prototype.get = get;
Member.prototype.getById = getById;
Member.prototype.create = create;
Member.prototype.update = update;
Member.prototype.destroy = destroy;

module.exports = Member;
