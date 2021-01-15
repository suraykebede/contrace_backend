const DataAccess = require("../../../../Data/DataAccess");

async function send_notification_mass(users, message, type) {
  const UserCollection = DataAccess.database.collection("Users");

  try {
    users.forEach(async (user) => {
      const Notification = await UserCollection.doc(user)
        .collection("Notifications")
        .doc()
        .set({
          type: type,
          msg: message,
          time: Date.now(),
        });
    });
    return "USERS_NOTIFIED";
  } catch (error) {
    return "ERROR";
  }
}

exports.send_notification_mass = send_notification_mass;
