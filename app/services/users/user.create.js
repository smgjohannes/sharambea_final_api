const db = require('../../models');

async function create(payload, req, files) {
  if (!req.user || req.user.role !== 'admin') {
    throw new Error('Unauthorized');
  }

  let createdUser = await db.User.create(payload);
  await this.image.upload(req, 'User', createdUser.id, files);
  return createdUser;
}

module.exports = { create };
