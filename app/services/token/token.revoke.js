const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @description Revoke a token
 * @param {string} userId - Id of the user.
 * @param {string} tokenId - Uuid of the token.
 * @returns {Promise} Return the revoked token.
 * @example
 * app.token.revoke('375223b3-71c6-4b61-a346-0a9d5baf12b4', '0a5f7305-4faf-42b3-aeb2-fbc0217c4855');
 */
async function revoke(userId, tokenId) {
  const token = await db.Token.findOne({
    attributes: ['id'],
    where: {
      id: tokenId,
      user_id: userId,
    },
  });

  if (token === null) {
    throw new NotFoundError('Token not found');
  }

  // revoke token in DB
  await token.update({ revoked: true });

  return {
    id: token.id,
    revoked: true,
  };
}

module.exports = {
  revoke,
};
