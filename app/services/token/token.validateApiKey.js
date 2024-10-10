const db = require('../../models');
const { TOKEN_TYPES } = require('../../utils/constants');
const { Error401 } = require('../../utils/httpErrors');
const { hashRefreshToken } = require('../../utils/refreshToken');

/**
 * @description Validate an API key.
 * @param {string} apiKey - The api key of the user.
 * @param {Array} scope - The scope to allow.
 * @returns {Promise} Resolving with userId.
 * @example
 * app.token.validateApiKey('xxxx', ['event:read']);
 */
async function validateApiKey(apiKey, scope) {
  const apiKeyHash = hashRefreshToken(apiKey);

  const token = await db.Token.findOne({
    where: {
      token_type: TOKEN_TYPES.API_KEY,
      token_hash: apiKeyHash,
    },
  });

  if (token === null) {
    throw new Error401(`Api key not found`);
  }

  if (token.valid_until < new Date()) {
    throw new Error401(`Api key has expired`);
  }

  if (token.revoked) {
    throw new Error401(`Api key was revoked`);
  }

  return token.user_id;
}

module.exports = {
  validateApiKey,
};
