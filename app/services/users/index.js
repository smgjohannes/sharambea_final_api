const { destroy } = require('./user.destroy');
const { get } = require('./user.get');
const { getById } = require('./user.getById');
const { update } = require('./user.update');
const { updatePassword } = require('./user.updatePassword');
const { login } = require('./user.login');

class User {
  constructor(token) {
    this.token = token;
  }
}

User.prototype.get = get;
User.prototype.getById = getById;
User.prototype.update = update;
User.prototype.destroy = destroy;
User.prototype.updatePassword = updatePassword;
User.prototype.login = login;

module.exports = User;
