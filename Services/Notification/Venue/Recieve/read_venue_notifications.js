const DataAccess = require("../../../../Data/DataAccess");

async function read_venue_notification(venue) {
  let notifications = [];
  const VenuesCollection = DataAccess.database.collection("Venues");
  try {
    const VenueNotificationCollection = VenuesCollection.doc(venue).collection(
      "Notifications"
    );
    let VenueNotifications = await VenueNotificationCollection.get();
    VenueNotifications.forEach((notification_information) => {
      let obj = {
        time: notification_information.data().time,
        msg: notification_information.data().msg,
        type: notification_information.data().type,
      };
      notifications.push(obj);
    });
    return notifications;
  } catch (error) {
      console.log(error);
      return 'ERROR';
  }
}

exports.read_venue_notification = read_venue_notification;
