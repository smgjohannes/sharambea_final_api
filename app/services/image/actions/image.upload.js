const fs = require('fs');
const fse = require('fs-extra');
const db = require('../../../models');
const { BadParameters, NotFoundError } = require('../../../utils/coreErrors');
const { Error400 } = require('../../../utils/httpErrors');

/**
 * @description Upload images
 * @param {Array} id - image id.
 * @returns {Promise} Return the created images.
 * @example
 * const destroy = await app.image.upload({}, 'Post', '375223b3-71c6-4b61-a346-0a9d5baf12b4', [{}]);
 */
async function upload(req, entityModel, entityId, files) {
  console.log('Received files:', files);
  if (files.length === 0) {
    throw new BadParameters(`No files provided.`);
  }

  const entity = await db[entityModel].findByPk(entityId, {
    include: [
      {
        model: db.Image,
        attributes: ['id', 'name', 'url', 'type', 'directory'],
      },
    ],
  });

  if (entity === null) {
    throw new NotFoundError(`${entityModel} not found..`);
  }

  const folder = entity.name ? entity.name : 'images';
  const uploadDir = `${__basedir}/uploads/${folder}`;

  try {
    // Ensure the directory exists
    fse.mkdirsSync(uploadDir);

    for (let file of files) {
      const imagePath = `${uploadDir}/${file.originalname}`;

      // Save image information to the database
      const image = await entity.createImage({
        type: file.mimetype,
        name: file.originalname,
        directory: folder,
      });

      // Read and save the image file
      const content = fs.readFileSync(`${__basedir}/uploads/${file.filename}`);
      fs.writeFileSync(imagePath, content);

      // Construct the image URL
      const imageUrl = `${req.protocol}://${req.get(
        'host'
      )}/uploads/${folder}/${file.originalname}`;

      // Update the image URL and save it to the database
      image.url = imageUrl;
      await image.save();

      // Delete the temporary file
      fs.unlinkSync(`${__basedir}/uploads/${file.filename}`);
    }

    return entity.reload();
  } catch (error) {
    console.error(error);
    throw new Error400('Error: could not upload images.');
  }
}

module.exports = { upload };
