const DataAccess = require("../../Data/DataAccess");

async function user_password_getter(username) {
  const UserCollection = DataAccess.database.collection("Users");
  try {
    const User = await UserCollection.doc(username).get();
    let UserInformation = User.data();
    console.log(UserInformation.password);
    return UserInformation.password;
  } catch (error) {
    return "ERROR";
  }
}

exports.user_password_getter = user_password_getter;
