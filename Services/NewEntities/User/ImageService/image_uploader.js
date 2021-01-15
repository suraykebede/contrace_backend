const MediaAccess = require("../../../../Data/MediaAccess");

async function image_uploader(UserImage) {
  console.log(UserImage.substring(1, 10)); 
  try {
    const UserImageUploader = await MediaAccess.cloudinary.uploader.upload(
      "data:image/jpeg;base64," + UserImage,
      {
        folder: "images",
      }
    );
    return UserImageUploader.secure_url;
  } catch (error) {
    console.log("inside the image uploader");
    console.log(error);
    return "ERROR";
  }
}

exports.image_uploader = image_uploader;
