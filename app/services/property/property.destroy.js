const db = require("../../models");
const { NotFoundError } = require("../../utils/coreErrors");
const imageService = require("../image/actions/image.destroy");
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

  // Delete each associated image using the image.destroy method
  if (property.Images && property.Images.length > 0) {
    for (let img of property.Images) {
      try {
        await imageService.destroy(img.id); // Call the image destroy method for each image
      } catch (e) {
        console.error("Error deleting image:", e.message);
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
