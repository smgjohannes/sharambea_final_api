const db = require("../../models");

/**
 * @description Destroy all user tokens
 * @param {string} userId - Id of the user.
 * @returns {Promise} Return the destroyed token.
 * @example
 * eventclub.token.destroy('375223b3-71c6-4b61-a346-0a9d5baf12b4');
 */
async function destroy(userId) {
  await db.Token.destroy({ where: { user_id: userId } });

  return {
    done: true,
  };
}

module.exports = {
  destroy,
};
