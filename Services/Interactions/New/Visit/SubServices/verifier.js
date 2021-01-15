const DataAccess = require("../../../../../Data/DataAccess");

async function verifier(username) {
  const UserCollection = DataAccess.database.collection("Users");
  const User = UserCollection.doc(username);
  try {
    const UserDataFromDB = await User.get();
    const UserData = UserDataFromDB.data();
    const CurrentVenue = UserData.current_venue;
    return CurrentVenue;
  } catch (error) {
    return "ERROR";
  }
}

exports.verifier = verifier;
