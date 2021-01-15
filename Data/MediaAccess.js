const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "contrace",
  api_key: 578664251123181,
  api_secret: "3LMo9F7BKCqfYrbsvg3WLzEFCZ0",
});

module.exports = { cloudinary };
