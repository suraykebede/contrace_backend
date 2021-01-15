const DataAccess = require("../../../Data/DataAccess");
const SendNotificationMassVenues = require("../../Notification/Venue/Send/send_notification_mass_venues");
const UseInternalLogs = require("./LogServices/use_internal_logs");

async function get_visited_venues(username) {
  let VenuesToNotify = [];
  let Message =
    "Some one that has visited your venue with in the last 14 days has tested positive for COVID-19";
  let FourteenDaysAgo = Date.now() - 1210000000;
  const UserCollection = DataAccess.database.collection("Users");
  const Visits = UserCollection.doc(username).collection("Visits");
  const ContactTracesCollection = DataAccess.database.collection(
    "ContactTraces"
  );
  try {
    let visits = await Visits.get();
    visits.forEach(async (visit) => {
      let Visit = visit.data();
      if (Visit.time_entered >= FourteenDaysAgo) {
        if (!VenuesToNotify.includes(Visit.venue)) {
          VenuesToNotify.push(Visit.venue);
        }
      }
    });
    if (VenuesToNotify.length !== 0) {
      let ContactTraceBuilder_Venues = await ContactTracesCollection.doc(
        username
      ).update({
        venues: VenuesToNotify,
      });
      let InternalLogOperations = await UseInternalLogs.use_internal_logs(
        username,
        VenuesToNotify
      );
      if (InternalLogOperations === "ERROR") {
        return "ERROR";
      }
    }

    let SendingNotifications = await SendNotificationMassVenues.send_notification_mass_venues(
      VenuesToNotify,
      Message
    );
    if (SendingNotifications === "VENUES_NOTIFIED") {
      return "VISITS_TRACED";
    } else {
      return "ERROR";
    }
  } catch (error) {
    return "ERROR";
  }
}

exports.get_visited_venues = get_visited_venues;
