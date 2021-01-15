const DataAccess = require("../../../../Data/DataAccess");
const VenuesCollection = DataAccess.database.collection("Venues");

async function get_venue_info(venue) {
  let VenueInformation = await VenuesCollection.doc(venue).get();
  let ven_data = VenueInformation.data();
  let info = {
    venue_latitude: ven_data.venue_latitude,
    venue_longitude: ven_data.venue_longitude,
    venue_name: ven_data.venue_name,
  };
  return info;
}

async function get_visits(username) {
  let visits_array = [];
  let visits_essentials = [];
  const UsersCollection = DataAccess.database.collection("Users");
  const VisitsCollection = UsersCollection.doc(username).collection("Visits");
  try {
    let VisitsData = await VisitsCollection.get();
    VisitsData.forEach(async (Visit) => {
      let visits_data = Visit.data();
      let visit_obj = {
        time_entered: visits_data.time_entered,
        time_exited: visits_data.time_exited,
        venue: visits_data.venue,
      };
      visits_essentials.push(visit_obj);
    });
    for (i = 0; i < visits_essentials.length; i++) {
      let ven_data = await get_venue_info(visits_essentials[i].venue);
      let visit_obj = {
        time_entered: visits_essentials[i].time_entered,
        time_exited: visits_essentials[i].time_exited,
        venue_latitude: ven_data.venue_latitude,
        venue_longitude: ven_data.venue_longitude,
        venue_name: ven_data.venue_name,
      };
      visits_array.push(visit_obj);
    }
    return visits_array;
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

exports.get_visits = get_visits;
