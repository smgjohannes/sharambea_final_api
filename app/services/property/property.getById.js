const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

async function getById(id) {
  const property = await db.Property.findOne({
    where: {
      id,
    },
    include: [
      { model: db.Image, attributes: ['id', 'name', 'url'] },
      { model: db.User, as: 'seller', attributes: ['id', 'name', 'email'] },
    ],
  });

  if (!property) {
    throw new NotFoundError('Property not found');
  }

  return property;
}

module.exports = { getById };
