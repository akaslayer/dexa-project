const cloudinary = require("../config/cloudinary.js");

const uploadImageToCloudinary = (imagePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imagePath, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.secure_url);
      }
    });
  });
};

module.exports = {
  uploadImageToCloudinary,
};
