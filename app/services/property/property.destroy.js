const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

async function destroy(id, req) {
  const property = await db.Property.findOne({
    where: {
      id,
      seller_id: req.user.id, 
    },
    include: {
      model: db.Image,
      attributes: ['id', 'url', 'type'],
    },
  });

  if (!property) {
    throw new NotFoundError(
      'Property not found or you do not have permission to delete it'
    );
  }

  if (property.Images && property.Images.length > 0) {
    for (let img of property.Images) {
      await this.image.destroy(img.id);
    }
  }

  await property.destroy();

  return { done: true };
}

module.exports = {
  destroy,
};
