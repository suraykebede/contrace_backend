const DataAccess = require("../../../../../Data/DataAccess");

async function get_attendees(venue) {
  const VenuesCollection = DataAccess.database.collection("Venues");
  const Venue = VenuesCollection.doc(venue);

  try {
    let VenueDataGetter = await Venue.get();
    let VenueData = VenueDataGetter.data();
    let NoOfAttendees = VenueData.attendees;
    return NoOfAttendees;
  } catch (error) {
    return "ERROR";
  }
}

exports.get_attendees = get_attendees;
