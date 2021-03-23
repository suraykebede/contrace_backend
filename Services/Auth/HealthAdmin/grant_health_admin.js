const DataAccess = require("../../../Data/DataAccess");
const send_notification = require("../../Notification/User/Send/send_notification");


async function grant_health_admin(username, password) {
  const HealthAdminCollection = DataAccess.database.collection("HealthAdmin");
  try {
    const HealthAdmin = await HealthAdminCollection.doc(username).set({
      password: password,
    });
    let msg = "Health admin rights granted";
    let type = "info";
    let send = await send_notification.send_notification(username, msg, type);
    return "ADMIN_ADDED";
  } catch (error) {
    return "ERROR";
  }
}

exports.grant_health_admin = grant_health_admin;
