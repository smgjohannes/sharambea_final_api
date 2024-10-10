const { create } = require('./token.create');
const { createApiKey } = require('./token.createApiKey');
const { get } = require('./token.get');
const { getAccessToken } = require('./token.getAccessToken');
const { validateAccessToken } = require('./token.validateAccessToken');
const { validateApiKey } = require('./token.validateApiKey');
const { revoke } = require('./token.revoke');
const { destroy } = require('./token.destroy');

class Token {
  constructor(jwtSecret) {
    this.jwtSecret = jwtSecret;
  }
}

Token.prototype.create = create;
Token.prototype.createApiKey = createApiKey;
Token.prototype.get = get;
Token.prototype.getAccessToken = getAccessToken;
Token.prototype.revoke = revoke;
Token.prototype.destroy = destroy;
Token.prototype.validateAccessToken = validateAccessToken;
Token.prototype.validateApiKey = validateApiKey;

module.exports = Token;
