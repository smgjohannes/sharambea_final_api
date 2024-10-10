const sharp = require('sharp');
const asyncMiddleware = require('./asyncMiddleware');

module.exports = function ResizeImageMiddleware(
  path,
  width = 1080,
  height = 1080
) {
  return asyncMiddleware(async (req, res, next) => {
    if (!req.file) return next();

    await sharp(req.file.path)
      .resize(width, height)
      .toFormat('png')
      .png({
        quality: 90,
      })
      .toFile(`uploads/images/${path}/${req.file.filename}`);

    next();
  });
};
