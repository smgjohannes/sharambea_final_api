const _ = require('lodash');
const db = require('../../models');

async function userNameExist(username) {
  const exists = await db.User.findOne({ where: { username } });

  return { exists: _.isObject(exists) };
}

module.exports = { userNameExist };
