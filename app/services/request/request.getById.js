const db = require('../../models');
async function getById(id) {
  return db.Request.findByPk(id);
}
module.exports = { getById };
