const DataAccess = require("../../../../Data/DataAccess");

async function read_notifications(username) {
  let notifications = [];
  const UserCollection = DataAccess.database.collection("Users");
  try {
    let get_notifications = await UserCollection.doc(username)
      .collection("Notifications")
      .get();
    get_notifications.forEach((notification) => {
      console.log(`psh_key ${notification.id}`);
      let notification_data = notification.data();
      let type = "info";
      if (notification_data.type) {
        type = notification_data.type;
      }
      let notification_object = {
        msg: notification_data.msg,
        time: notification_data.time,
        type: type,
      };
      notifications.push(notification_object);
    });
    return notifications;
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

exports.read_notifications = read_notifications;
