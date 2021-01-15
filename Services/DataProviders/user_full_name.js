const DataAccess = require("../../Data/DataAccess");

async function user_full_name(username) {
    console.log(`username ${username}`);
  const UserCollection = DataAccess.database.collection("Users");
  const UserNeeded = UserCollection.doc(username);

  try {
    let UserInformationRequest = await UserNeeded.get();
    let UserData = UserInformationRequest.data();
    console.log(UserData);
    let user_full_name_object = {
      first_name: UserData.first_name,
      last_name: UserData.last_name,
    };
    return user_full_name_object;
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

exports.user_full_name = user_full_name;
