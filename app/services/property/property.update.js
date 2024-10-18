const fs = require('fs');
const path = require('path');
const db = require('../../models');
const { Error400 } = require('../../utils/httpErrors');
const { upload } = require('../image/actions/image.upload');

async function update(id, data, req) {
  const transaction = await db.sequelize.transaction();
  try {
    const property = await db.Property.findOne({
      where: {
        id,
        seller_id: req.user.id,
      },
      include: {
        model: db.Image,
        attributes: ['id', 'url', 'type', 'directory', 'name'],
      },
    });

    if (!property) {
      throw new Error('Property not found or you do not have permission to update it');
    }

    await property.update(data, { transaction });

    if (req.files && req.files.length > 0) {
      if (property.Images && property.Images.length > 0) {
        for (let img of property.Images) {
          const filePath = path.join(__basedir, 'uploads', img.directory, img.name);

          if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
          }

          await db.Image.destroy({ where: { id: img.id }, transaction });
        }
      }

      const uploadedImages = await upload(req, 'Property', property.id, req.files);
      console.log('Uploaded Images:', uploadedImages);

      for (let file of uploadedImages) {
        await db.Image.create({
          type: file.filetype,
          name: file.filename,
          directory: file.directory,
          url: file.fileurl,
          propertyId: property.id,
        }, { transaction });
      }
    }

    const updatedProperty = await db.Property.findOne({
      where: {
        id,
        seller_id: req.user.id,
      },
      include: {
        model: db.Image,
        attributes: ['id', 'name', 'url', 'type', 'directory'],
      },
    });

    await transaction.commit();
    return updatedProperty;

  } catch (error) {
    await transaction.rollback();
    console.error('Error updating property:', error);
    throw new Error400(error.message);
  }
}

module.exports = { update };
