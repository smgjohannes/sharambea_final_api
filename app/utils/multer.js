const multer = require('multer');
const path = require('path');
const { Error400 } = require('./httpErrors');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const limits = {
  fileSize: 1080 * 1080,
};

const fileFilter = (req, file, cb) => {
  if (
    !file.originalname.match(
      /\.(jpg|JPG|jpeg|JPEG|png|PNG|WEBP|webp|gif|pdf|excel|docs)$/
    )
  ) {
    req.fileValidationError = 'File type not allowed!';
    return cb(new Error400(`${file.mimetype} is not supported ..`), false);
  }
  cb(null, true);
};

/**
 * Upload single image
 * @param {String} name
 */
const singleFile = (name) => (req, res, next) => {
  const upload = multer({
    storage,
    limits,
    fileFilter,
  }).single(name);

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return next(new Error400(`Cannot Upload More Than 1 Image`));
      }
    }

    if (err) return next(new Error400(err));
    next();
  });
};

/**
 * Upload any number of images with any name
 */
const manyFiles = () => (req, res, next) => {
  const upload = multer({
    storage,
    limits,
    fileFilter,
  }).any();

  upload(req, res, (err) => {
    if (err) return next(new Error400(err));
    next();
  });
};

module.exports = { manyFiles, singleFile };
