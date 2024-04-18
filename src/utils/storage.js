import fs from 'fs';
import path from 'path';

export const destroyFile = (filename) => {
  const mediaPath = path.join('assets', filename);
  fs.stat(mediaPath, function (err, stats) {
    if (err) {
      return console.error(err);
    }
    fs.unlink(mediaPath, function (err) {
      if (err) return console.log(err);
    });
  });
};

export const uploadFile = async (file, foldername) => {
  try {
    const filename = Date.now() + '.' + file.mimetype.split('/')[1];
    const mediaPath = path.join('src', 'assets', foldername, filename);
    fs.writeFileSync(mediaPath, file.buffer);
    return `/${foldername}/${filename}`;
  } catch (err) {
    return err;
  }
};
