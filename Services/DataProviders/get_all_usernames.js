const DataAccess = require("../../Data/DataAccess");

async function get_all_usernames() {
  let usernames = [];
  const UserCollection = DataAccess.database.collection("Users");
  try {
    let Users = await UserCollection.get();
    Users.forEach((user) => {
      usernames.push(user.id);
    });
    return usernames;
  } catch (error) {
    return "ERROR";
  }
}

exports.get_all_usernames = get_all_usernames;
