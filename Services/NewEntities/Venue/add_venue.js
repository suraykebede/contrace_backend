const DataAccess = require("../../../Data/DataAccess");
const SendNotification = require("../../Notification/User/Send/send_notification");

async function add_venue(venue) {
  const VenuesCollection = DataAccess.database.collection("Venues");
  const UserCollection = DataAccess.database.collection("Users");
  try {
    let user_getter = await UserCollection.doc(venue.administrator).get();
    let user_verifier = user_getter.exists;
    if(!user_verifier){
      return 'NO_SUCH_USER';
    }
    const VenueToAdd = await VenuesCollection.doc(venue.venue).set({
      venue_name: venue.venue_name,
      venue: venue.venue,
      attendees: 0,
      venue_latitude: venue.venue_latitude,
      venue_longitude: venue.venue_longitude,
      venue_type: venue.venue_type,
      service: venue.service,
      administrator: venue.administrator,
      infection: venue.infection,
      license_plate: venue.license_plate,
    });
    let msg = 'Admin rights, see venue tab';
    let type = 'info';
    let Notifier = await SendNotification.send_notification(
      venue.administrator,
      msg,
      type
    );
    if (Notifier === "ERROR") {
      return "ERROR";
    }
    return "VENUE_ADDED";
  } catch (error) {
    console.log("error in add_venue, " + error);
    return "ERROR";
  }
}

exports.add_venue = add_venue;
