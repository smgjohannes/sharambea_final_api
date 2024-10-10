const db = require('../../models');

async function create(payload, req, files) {
  console.log(payload);
  let createdProperty = await db.Property.create({
    ...payload,
    seller_id: req.user.id,
  });

  await this.image.upload(req, 'Property', createdProperty.id, files);

  return createdProperty;
}

module.exports = { create };
