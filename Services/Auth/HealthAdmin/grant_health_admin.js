const DataAccess = require("../../../Data/DataAccess");

async function grant_health_admin(username, password) {
  const HealthAdminCollection = DataAccess.database.collection("HealthAdmin");
  try {
    const HealthAdmin = await HealthAdminCollection.doc(username).set({
      password: password,
    });
    return "ADMIN_ADDED";
  } catch (error) {
    return "ERROR";
  }
}

exports.grant_health_admin = grant_health_admin;
