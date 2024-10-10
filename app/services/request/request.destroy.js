const db = require('../../models');
async function destroy(id) {
  const request = await db.Request.findByPk(id);
  await request.destroy();
  return request;
}
module.exports = { destroy };
