const DataAccess = require("../../Data/DataAccess");

async function image_getter(username) {
  const UserCollection = DataAccess.database.collection("Users");
  try {
    const UserGetter = await UserCollection.doc(username).get();
    let UserData = UserGetter.data();
    let image = UserData.image;
    return image;
  } catch (error) {
    return "ERROR";
  }
}

exports.image_getter = image_getter;
