const jwt = require('jsonwebtoken');
const { Error401 } = require('../../utils/httpErrors');

/**
 * @description Validate an access token.
 * @param {string} accessToken - The access token to verify.
 * @param {string} scope - The scope required.
 * @example
 * app.token.validateAccessToken('test', 'event:write');
 */
function validateAccessToken(accessToken, scope) {
  /**
   * @type {object} decoded
   */
  const decoded = jwt.verify(accessToken, this.jwtSecret, {
    issuer: 'moonsnacksfoods',
    audience: 'user',
  });

  // we verify that the scope required to access this route is here
  if (decoded.scope.includes(scope) === false) {
    throw new Error401(
      `AuthMiddleware: Scope "${scope}" is not in list of authorized scope ${decoded.scope}`
    );
  }

  return decoded;
}

module.exports = {
  validateAccessToken,
};
