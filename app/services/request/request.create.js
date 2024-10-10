const db = require('../../models');

async function create(payload, req, files) {
  // Create the request in the database
  let createdRequest = await db.Request.create(payload);

  // If files are provided, upload them
  if (files && files.length > 0) {
    await this.image.upload(req, 'Request', createdRequest.id, files);
  }

  return createdRequest;
}

module.exports = { create };
