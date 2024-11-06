const axios = require("axios");
const FormData = require("form-data");
const db = require("../../models");
const { NotFoundError } = require("../../utils/coreErrors");

async function destroy(id, req) {
  // Find the property by ID and seller_id to ensure the user owns the property
  const property = await db.Property.findOne({
    where: {
      id,
      seller_id: req.user.id, // Ensure the logged-in user is the seller of the property
    },
    include: {
      model: db.Image,
      attributes: ["id", "url", "type"],
    },
  });

  if (!property) {
    throw new NotFoundError(
      "Property not found or you do not have permission to delete it"
    );
  }

  // Delete the images from the external server and from the database
  if (property.Images && property.Images.length > 0) {
    for (let img of property.Images) {
      const form = new FormData();
      form.append("action", "delete");
      form.append("folder", img.url.split("/")[3]); // Extract folder from the URL
      form.append("filename", img.url.split("/")[4]); // Extract filename from the URL

      try {
        // Send delete request to the external server
        await axios.post("https://files.sharambeaprop.com/uploader.php", form, {
          headers: {
            ...form.getHeaders(),
          },
        });

        // After successful deletion, delete the image from the database
        await db.Image.destroy({
          where: {
            id: img.id,
          },
        });
      } catch (e) {
        console.error("Error deleting image from external server:", e.message);
        // You could handle or log the error here but continue with deleting other images and the property
      }
    }
  }

  // Finally, delete the property after all associated images are deleted
  await property.destroy();

  return { done: true };
}

module.exports = {
  destroy,
};
