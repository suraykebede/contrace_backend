const DataAccess = require("../../Data/DataAccess");

async function get_phonenumber(username) {
  let phone_number = "";
  const UserCollection = DataAccess.database.collection("Users");
  try {
    let UserInformation = await UserCollection.doc(username).get();
    let UserData = UserInformation.data();
    phone_number = UserData.phone_number;
    return phone_number;
  } catch (error) {
    return "ERROR";
  }
}

exports.get_phonenumber = get_phonenumber;
