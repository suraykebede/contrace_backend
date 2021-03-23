const DataAccess = require("../../../Data/DataAccess");
const send_notification = require("../../Notification/User/Send/send_notification");

async function remove_testing_site_admin(username) {
  const TestingSiteAdminCollection = DataAccess.database.collection(
    "TestSiteAdmins"
  );
  try {
    console.log("about to delete");
    const TestingSiteAdmin = await TestingSiteAdminCollection.doc(
      username
    ).delete();
    console.log("deleting");
    let msg = "Testing admin rights revoked";
    let type = "info";
    console.log("sending notification");
    let send = await send_notification.send_notification(username, msg, type);
    console.log("sent notifications");
    console.log("so far so good");
    return "ADMIN_REMOVED";
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

exports.remove_testing_site_admin = remove_testing_site_admin;
