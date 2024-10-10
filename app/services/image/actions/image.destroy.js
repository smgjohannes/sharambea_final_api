const fs = require('fs');
const db = require('../../../models');
const { NotFoundError } = require('../../../utils/coreErrors');

/**
 * @description Destroy a image
 * @param {string} id - image id.
 * @returns {Promise} Return the destroyed image.
 * @example
 * const destroy = await freshly.image.destroy('375223b3-71c6-4b61-a346-0a9d5baf12b4');
 */
async function destroy(id) {
  const image = await db.Image.findByPk(id);

  if (image === null) {
    throw new NotFoundError('Image not found');
  }

  let deleted = false;

  try {
    // delete image file
    fs.unlinkSync(`${__basedir}/uploads/${image.directory}/${image.name}`);
    deleted = true;
    // delete model
    await image.destroy();
  } catch (e) {
    deleted = false;
  }

  return { deleted };
}

module.exports = {
  destroy,
};
