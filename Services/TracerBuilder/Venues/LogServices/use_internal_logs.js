const DataAccess = require("../../../../Data/DataAccess");
const SendNotificationsMass = require("../../../Notification/User/Send/send_notification_mass");

async function use_internal_logs(username, venue_array) {
  let Users = [];
  const VenuesCollection = DataAccess.database.collection("Venues");
  const ContactTracesCollection = DataAccess.database.collection(
    "ContactTraces"
  );
  var FourteenDaysAgo = Date.now() - 1210000000;
  try {
    for (let index = 0; index < venue_array.length; index++) {
      const Venue = venue_array[index];
      let VenueData = await VenuesCollection.doc(Venue)
        .collection("InternalLog")
        .get();
      VenueData.forEach((VenueLog) => {
        let LogData = VenueLog.data();
        if (LogData.log_average_time >= FourteenDaysAgo) {
          if (!Users.includes(VenueLog.id) && VenueLog.id !== username) {
            Users.push(VenueLog.id);
          }
        }
      });
    }
    if (Users.length !== 0) {
      let ValueUpdate = await ContactTracesCollection.doc(username).update({
        other_contacts: Users,
      });
      let msg = "indirect contact";
      let type = "warning";
      let sending = await SendNotificationsMass.send_notification_mass(
        Users,
        msg
      );
    }
    return "INTERNAL_LOGS_CLEARED";
  } catch (error) {
    return "ERROR";
  }
}

exports.use_internal_logs = use_internal_logs;
