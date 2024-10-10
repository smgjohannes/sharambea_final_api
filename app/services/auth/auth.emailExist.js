const _ = require('lodash');
const db = require('../../models');

async function emailExist(email) {
  const user = await db.User.findOne({ where: { email } });

  return { exists: _.isObject(user) };
}

module.exports = { emailExist };
