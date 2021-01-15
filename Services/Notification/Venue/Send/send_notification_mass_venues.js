const DataAccess = require("../../../../Data/DataAccess");

async function send_notification_mass_venues(venues, message) {
  const VenueCollection = DataAccess.database.collection("Venues");

  try {
    venues.forEach(async (venue) => {
      const Notification = await VenueCollection.doc(venue)
        .collection("Notifications")
        .doc()
        .set({
          type: 'warning',
          msg: message,
          time: Date.now(),
        });
    });
    return "VENUES_NOTIFIED";
  } catch (error) {
    return "ERROR";
  }
}

exports.send_notification_mass_venues = send_notification_mass_venues;
