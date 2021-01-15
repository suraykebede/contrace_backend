const DataAccess = require("../../../Data/DataAccess");

async function get_venue_information(username) {
  const VenueAdmin = DataAccess.database.collection("VenueAdministrator");
  try {
    let venue_object = {
        venue: "NON",
        venue_name: "NON",
        attendees: -1
    }
    let venue_administrator = await VenueAdmin.doc(username).get();
    if (venue_administrator.exists) {
        let data = venue_administrator.data();
        let venue = data.venue;
        const VenueCollection = DataAccess.database.collection('Venues');
        let venue_info = await VenueCollection.doc(venue).get();
        let venue_info_data = venue_info.data();
        let venue_name = venue_info_data.venue_name;
        let attendees = venue_info_data.attendees;
        venue_object.attendees = attendees;
        venue_object.venue = venue;
        venue_object.venue_name = venue_name;
        return venue_object;
    } else {
      return venue_object;
    }
  } catch (error) {
      console.log(error);
      return 'ERROR'
  }
}

exports.get_venue_information = get_venue_information;
