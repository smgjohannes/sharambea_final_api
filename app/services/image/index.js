const { destroy } = require('./actions/image.destroy');
const { upload } = require('./actions/image.upload');


class Image {
  constructor() {}
}
Image.prototype.upload = upload;
Image.prototype.destroy = destroy;

module.exports = Image;
