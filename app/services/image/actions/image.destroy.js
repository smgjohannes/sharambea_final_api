const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const db = require("../../../models");
const { NotFoundError } = require("../../../utils/coreErrors");

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
    throw new NotFoundError("Image not found");
  }

  let deleted = false;

  const form = new FormData();
  form.append("action", "delete");
  form.append("folder", image.directory);
  form.append("filename", image.name);

  try {
    // delete image file
    const response = await axios.post(
      "https://files.sharambeaprop.com/uploader.php",
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
      }
    );
    // delete model
    await image.destroy();
    deleted = true;
  } catch (e) {
    deleted = false;
    console.log(e);
  }

  return { deleted };
}

module.exports = {
  destroy,
};
