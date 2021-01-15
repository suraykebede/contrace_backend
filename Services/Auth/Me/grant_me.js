const DataAccess = require("../../../Data/DataAccess");

async function grant_me(username, password) {
  const SysAdminCollection = DataAccess.database.collection("SysAdmin");
  try {
    const SysAdmin = await SysAdminCollection.doc(username).set({
      password: password,
    });
    return "ADMIN_ADDED";
  } catch (error) {
    return "ERROR";
  }
}

exports.grant_me = grant_me;
