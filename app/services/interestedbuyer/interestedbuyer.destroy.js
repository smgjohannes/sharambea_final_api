const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

async function destroy(id, res) {
  const buyer = await db.InterestedBuyers.findOne({
    where: { id },
    // include: {
    //   model: db.Image,
    //   attributes: ['id', 'url', 'type'],
    // },
  });

  if (!buyer) {
    throw new NotFoundError('InterestedBuyer not found');
  }

  // If you need to delete associated images, uncomment and update the code below
  // if (buyer.Images && buyer.Images.length > 0) {
  //   for (let img of buyer.Images) {
  //     await this.image.destroy(img.id);
  //   }
  // }

  // Destroy the buyer
  await buyer.destroy();

  return { done: true };
}

module.exports = {
  destroy,
};
