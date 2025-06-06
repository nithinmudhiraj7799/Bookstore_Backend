// config/storage.js
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", 
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

module.exports = storage;
