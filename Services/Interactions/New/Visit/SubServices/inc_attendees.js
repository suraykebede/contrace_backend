const DataAccess = require("../../../../../Data/DataAccess");
const GetAttendees = require("./get_attendees");

async function inc_attendees(venue) {
  const VenuesCollection = DataAccess.database.collection("Venues");
  const Venue = VenuesCollection.doc(venue);

  try {
    let CurrentAttendees = await GetAttendees.get_attendees(venue);
    let IncrementedAttendees = Venue.update({
      attendees: CurrentAttendees + 1,
    });
    return "INCREMENTED";
  } catch (error) {
    return "ERROR";
  }
}

exports.inc_attendees = inc_attendees;
