const DataAccess = require("../../../../Data/DataAccess");

async function send_notification(username, msg, type) {
  const UsersCollection = DataAccess.database.collection("Users");
  const User = UsersCollection.doc(username);
  try {
    const Notification = User.collection("Notifications");
    let Notifier = await Notification.doc().set({
      type: type,
      msg: msg,
      time: Date.now(),
    });
    return "NOTIFIED";
  } catch (error) {
    console.log("error in notifier " + error);
    return "ERROR";
  }
}

exports.send_notification = send_notification;
