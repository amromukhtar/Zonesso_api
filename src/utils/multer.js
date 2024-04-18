import multer from 'multer';
import AppError from './appError';

const storage = multer.memoryStorage();
// fileSize: 1024 * 1024
const limits = {};

const fileFilter = (req, file, cb) => {
  if (
    !file.originalname.match(
      /\.(jpg|JPG|jpeg|JPEG|png|PNG|mp4|mov|avi|wmv|mkv|flv|webm|mpeg|mpg|3gp)$/
    )
  ) {
    req.fileValidationError = 'Only image or video files are allowed!';
    return cb(new AppError('Please upload only image or video', 400), false);
  }
  cb(null, true);
};

export const anyMulter = () => (req, res, next) => {
  const upload = multer({
    storage,
    limits,
    fileFilter
  }).any();

  upload(req, res, (err) => {
    if (err) return next(new AppError(err, 500));
    next();
  });
};
