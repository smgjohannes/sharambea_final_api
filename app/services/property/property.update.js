const fs = require('fs');
const db = require('../../models');
const { Error400 } = require('../../utils/httpErrors');
const { upload } = require('../image/actions/image.upload');

async function update(propertyId, data, req) {
  try {
    const property = await db.Property.findOne({
      where: {
        propertyId,
        seller_id: req.user.id, // Ensure the property belongs to the logged-in user
      },
      include: {
        model: db.Image,
        attributes: ['id', 'url', 'type', 'directory', 'name'],
      },
    });

    if (!property) {
      throw new Error(
        'Property not found or you do not have permission to update it'
      );
    }

    await property.update(data);

    if (req.files && req.files.length > 0) {
      // Delete existing images
      if (property.Images && property.Images.length > 0) {
        for (let img of property.Images) {
          const filePath = `${__basedir}/uploads/${img.directory}/${img.name}`;

          if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
          }

          await db.Image.destroy({ where: { id: img.id } });
        }
      }

      // Upload new images
      await upload(req, 'Property', property.id, req.files);
    }

    return property;
  } catch (error) {
    console.error(error);
    throw new Error400(error.message);
  }
}

module.exports = {
  update,
};
