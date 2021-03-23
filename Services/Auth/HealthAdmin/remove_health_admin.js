const DataAccess = require("../../../Data/DataAccess");
const {
  send_notification,
} = require("../../Notification/User/Send/send_notification");

async function remove_health_admin(username) {
  const HealthAdminCollection = DataAccess.database.collection("HealthAdmin");
  try {
    const HealthAdmin = await HealthAdminCollection.doc(username).delete();
    let msg = "Health admin rights revoked";
    let type = "info";
    let send = await send_notification(username, msg, type);
    return "ADMIN_REMOVED";
  } catch (error) {
    return "ERROR";
  }
}

exports.remove_health_admin = remove_health_admin;
