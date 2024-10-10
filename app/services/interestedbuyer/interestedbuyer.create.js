const db = require('../../models');

async function create(data, req, files) {
  let createdInterestedBuyer = await db.InterestedBuyers.create(data);

  if (files) {
    await this.image.upload(
      req,
      'InterestedBuyers',
      createdInterestedBuyer.id,
      files
    );
  }

  return createdInterestedBuyer;
}

module.exports = { create };
