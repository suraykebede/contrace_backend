const DataAccess = require("../../../Data/DataAccess");

async function get_all_venues() {
  let venues = [];
  const VenuesCollection = DataAccess.database.collection("Venues");
  try {
    const VenuesData = await VenuesCollection.get();
    VenuesData.forEach((venue_data_obj) => {
      let venue = venue_data_obj.id;
      let venue_data = venue_data_obj.data();
      let venue_obj = {
        venue: venue,
        venue_name: venue_data.venue_name,
        administrator: venue_data.administrator,
        venue_latitude: venue_data.venue_latitude,
        venue_longitude: venue_data.venue_longitude,
      };
      venues.push(venue_obj);
    });
    return venues;
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

exports.get_all_venues = get_all_venues;
