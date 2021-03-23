const DataAccess = require("../../../Data/DataAccess");
const send_notification = require("../../Notification/User/Send/send_notification");

async function grant_testing_site_admin(username, password) {
  const TestingSiteAdminCollection = DataAccess.database.collection(
    "TestSiteAdmins"
  );
  try {
    const TestingSiteAdmin = await TestingSiteAdminCollection.doc(username).set(
      {
        password: password,
      }
    );
    let msg = "Testing admin rights granted";
    let type = "info";
    let send = await send_notification.send_notification(username, msg, type);
    return "ADMIN_ADDED";
  } catch (error) {
    return "ERROR";
  }
}

exports.grant_testing_site_admin = grant_testing_site_admin;
