const db = require('../../models');
const { TOKEN_TYPES } = require('../../utils/constants');
const { generateRefreshToken } = require('../../utils/refreshToken');
const { generateAccessToken } = require('../../utils/accessToken');

/**
 * @description Create and save in database a refresh_token
 * @param {string} userId - The uuid of a user.
 * @param {Array} scope - Scope the refresh token is able to access.
 * @param {number} validityInSeconds - Validity of the refreshToken.
 * @param {string} useragent - Device linked to this token.
 * @returns {Promise} Resolving with the refreshToken.
 * @example
 * eventclub.token.create('7144a75d-1ec2-4f31-a587-a4b316c28754', {});
 */
async function create(userId, scope, validityInSeconds, useragent) {
  const { refreshToken, refreshTokenHash } = await generateRefreshToken();

  const newToken = {
    user_id: userId,
    token_type: TOKEN_TYPES.REFRESH_TOKEN,
    token_hash: refreshTokenHash,
    scope: scope.join(','),
    valid_until: new Date(Date.now() + validityInSeconds * 1000),
    useragent,
  };

  const token = await db.Token.create(newToken);
  const accessToken = generateAccessToken(
    userId,
    scope,
    token.id,
    this.jwtSecret
  );

  return {
    refresh_token: refreshToken,
    access_token: accessToken,
    token_id: token.id,
  };
}

module.exports = {
  create,
};
