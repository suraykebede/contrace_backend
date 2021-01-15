const DataAccess = require("../../../Data/DataAccess");
const DoIExist = require("../do_i_exist");

async function auth_health_admin(username, password) {
  let userExists = await DoIExist.do_i_exist(username);
  if (userExists != "ERROR") {
    if (userExists == "NON_EXISTS") {
      console.log("no such user exists");
      return "NO_SUCH_USER";
    } else {
      const UserIdentifier = DataAccess.database
        .collection("HealthAdmin")
        .doc(username);
      try {
        const User = await UserIdentifier.get();
        const UserData = User.data();
        if (!UserData) {
          return "NOT_GRANTED";
        }
        const storedPassword = UserData.password;
        if (storedPassword !== password) {
          console.log("passwords mismatch");
          return "PASSWORD_MISMATCH";
        } else {
          console.log("authorized");
          return "AUTHORIZED";
        }
      } catch (error) {
        console.log(error);
        console.log("no connection");
        return "ERROR";
      }
    }
  } else {
    console.log("no connection");
    return "ERROR";
  }
}

exports.auth_health_admin = auth_health_admin;
