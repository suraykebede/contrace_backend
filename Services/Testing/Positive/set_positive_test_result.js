const DataAccess = require("../../../Data/DataAccess");
const GetMetPerson = require("../../TracerBuilder/Meetings/get_met_persons");
const GetVisitedVenues = require("../../TracerBuilder/Venues/get_visited_venues");
async function set_positive_test_result(username) {
  const SampleCollection = DataAccess.database.collection("Samples");
  const Sample = SampleCollection.doc(username);

  try {
    let SampleResultUpdate = await Sample.update({ result: "Positive" });
    let TraceMeetings = await GetMetPerson.get_met_person(username);
    let TraceVisits = await GetVisitedVenues.get_visited_venues(username);
    if (
      TraceMeetings === "MEETINGS_TRACED" &&
      TraceVisits === "VISITS_TRACED"
    ) {
      return "TRACE_COMPLETE";
    } else {
      return "ERROR";
    }
  } catch (error) {
    return "ERROR";
  }
}

exports.set_positive_test_result = set_positive_test_result;
