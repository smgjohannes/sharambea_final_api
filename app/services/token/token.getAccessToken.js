const db = require('../../models');
const { TOKEN_TYPES } = require('../../utils/constants');
const { Error401 } = require('../../utils/httpErrors');
const { hashRefreshToken } = require('../../utils/refreshToken');
const { generateAccessToken } = require('../../utils/accessToken');

/**
 * @description Create and save in database a refresh_token
 * @param {string} refreshToken - The refresh token of the user.
 * @param {Array} scope - The scope to allow.
 * @returns {Promise} Resolving with the refreshToken.
 * @example
 * app.token.getAccessToken('xxxx');
 */
async function getAccessToken(refreshToken, scope) {
  if (!refreshToken || refreshToken.length === 0) {
    throw new Error401('No token provided');
  }

  const refreshTokenHash = hashRefreshToken(refreshToken);

  const token = await db.Token.findOne({
    where: {
      token_type: TOKEN_TYPES.REFRESH_TOKEN,
      token_hash: refreshTokenHash,
    },
  });

  if (token === null) {
    throw new Error401(`Token not found`);
  }

  if (token.valid_until < new Date()) {
    throw new Error401(`Token has expired`);
  }

  if (token.revoked) {
    throw new Error401(`Token was revoked`);
  }

  const accessToken = generateAccessToken(
    token.user_id,
    scope,
    token.id,
    this.jwtSecret
  );

  return {
    access_token: accessToken,
  };
}

module.exports = {
  getAccessToken,
};
