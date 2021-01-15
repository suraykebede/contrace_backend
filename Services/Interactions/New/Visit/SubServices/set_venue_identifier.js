const DataAccess = require("../../../../../Data/DataAccess");

async function set_venue_identifier(username, identifier_flag, psh_key) {
  const UserCollection = DataAccess.database.collection("Users");
  const User = UserCollection.doc(username);
  try {
    const UserVenueFlagUpdate = await User.update({
      current_venue: identifier_flag,
      psh_key: psh_key,
    });
    return "FLAG_CHANGED";
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

exports.set_venue_identifier = set_venue_identifier;
