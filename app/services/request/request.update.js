const db = require('../../models');
async function update(id, data, req) {
  await db.Request.update(data, { where: { id } });
  if (req.files) {
    await this.image.upload(req, 'Request', id, req.files);
  }
  return db.Request.findByPk(id);
}
module.exports = { update };
