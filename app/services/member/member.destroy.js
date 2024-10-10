const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

async function destroy(id, res) {
  const member = await db.Member.findOne({
    where: { id },
    include: {
      model: db.Image,
      attributes: ['id', 'url', 'type'],
    },
  });

  if (!member) {
    throw new NotFoundError('Member not found');
  }

  if (member.Images && member.Images.length > 0) {
    for (let img of member.Images) {
      await this.image.destroy(img.id);
    }
  }

  await member.destroy();

  return { done: true };
}

module.exports = {
  destroy,
};
