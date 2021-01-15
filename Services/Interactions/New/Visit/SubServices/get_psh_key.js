const DataAccess = require("../../../../../Data/DataAccess");

async function get_psh_key(username) {
  const UserCollection = DataAccess.database.collection("Users");
  const User = UserCollection.doc(username);
  try {
    const UserDataFromDB = await User.get();
    const UserData = UserDataFromDB.data();
    const CurrentVenue = UserData.psh_key;
    return CurrentVenue;
  } catch (error) {
    return "ERROR";
  }
}

exports.get_psh_key = get_psh_key;
