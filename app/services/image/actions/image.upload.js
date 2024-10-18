const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
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
  // console.log('Received files:', files);
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

   const form = new FormData();
   form.append('action', 'upload'); 
   form.append('folder', folder); 

  try {

    files.forEach(filePath => {
      form.append('images[]', fs.createReadStream(filePath.path));
    });

    const response = await axios.post('https://files.sharambeaprop.com/uploader.php', form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    const images = response.data.files;
console.log(images);
    for (let file of images) {

      await entity.createImage({
        type: file.filetype,
        name: file.filename,
        directory: folder,
        url: file.fileurl,
      });

    }

    return entity.reload();
  } catch (error) {
    console.error(error);
    throw new Error400('Error: could not upload images.');
  }
}


module.exports = { upload };
