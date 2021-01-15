const DataAccess = require("../../Data/DataAccess");

async function do_i_exist(username) {
  console.log(`Checking if ${username} exists`);
  const UserIdentifier = DataAccess.database.collection("Users").doc(username);

  try {
    const User = await UserIdentifier.get();
    if (User.exists) {
      console.log(`${username} exists`);
      return "EXISTS";
    } else {
      console.log(`${username} does not exist`);
      return "NON_EXISTS";
    }
  } catch (error) {
    console.log(error);
    console.log("no connection, do i exist");
    return "ERROR";
  }
}

exports.do_i_exist = do_i_exist;
