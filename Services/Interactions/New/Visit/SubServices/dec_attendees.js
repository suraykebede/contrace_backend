const DataAccess = require("../../../../../Data/DataAccess");
const GetAttendees = require("./get_attendees");

async function dec_attendees(venue) {
  const VenuesCollection = DataAccess.database.collection("Venues");
  const Venue = VenuesCollection.doc(venue);

  try {
    let CurrentAttendees = await GetAttendees.get_attendees(venue);
    let decrementedAttendees = Venue.update({
      attendees: CurrentAttendees - 1,
    });
    return "DECREMENTED";
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

exports.dec_attendees = dec_attendees;
