const asyncMiddleware = require('../middleware/asyncMiddleware');

module.exports = function ImageController(freshly) {
  async function upload(req, res) {
    const { files } = req;
    const { entity_id } = req.params;
    const { entity } = req.query;

    const response = await freshly.image.upload(req, entity, entity_id, files);
    res.json(response);
  }

  async function destroy(req, res) {
    const { id } = req.params;
    const response = await freshly.image.destroy(id);
    res.json(response);
  }

  return Object.freeze({
    upload: asyncMiddleware(upload),
    destroy: asyncMiddleware(destroy),
  });
};
