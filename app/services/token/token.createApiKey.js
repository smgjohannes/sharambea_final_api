const db = require('../../models');
const { TOKEN_TYPES } = require('../../utils/constants');
const { generateApiKey } = require('../../utils/refreshToken');

/**
 * @description Create and save in database a new API key.
 * @param {string} userId - The uuid of a user.
 * @param {Array} scope - Scope the api key is able to access.
 * @returns {Promise} Resolving with the api key.
 * @example
 * app.token.createApiKey('7144a75d-1ec2-4f31-a587-a4b316c28754', ['event:read']);
 */
async function createApiKey(userId, scope) {
  const { apiKey, apiKeyHash } = await generateApiKey();

  const newToken = {
    user_id: userId,
    token_type: TOKEN_TYPES.API_KEY,
    token_hash: apiKeyHash,
    scope: scope.join(','),
    valid_until: null,
  };

  const token = await db.Token.create(newToken);

  return {
    api_key: apiKey,
    token_id: token.id,
  };
}

module.exports = {
  createApiKey,
};
