const DataAccess = require("../../../../Data/DataAccess");
const GetAverage = require("./SubServices/get_average");

async function internal_log(venue, username, psh_key) {
  const VenuesCollection = DataAccess.database.collection("Venues");
  const Venue = VenuesCollection.doc(venue);
  const Log = Venue.collection("InternalLog");

  const UsersCollection = DataAccess.database.collection("Users");
  const VisitInformation = UsersCollection.doc(username)
    .collection("Visits")
    .doc(psh_key);

  try {
    let VisitData = await VisitInformation.get();
    let visit_data = VisitData.data();
    let time_entered = visit_data.time_entered;
    let time_exited = visit_data.time_exited;
    let internallog = await Log.doc(username).set({
      log_average_time: GetAverage.get_average(time_entered, time_exited),
    });
    return "LOGGED";
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

exports.internal_log = internal_log;
