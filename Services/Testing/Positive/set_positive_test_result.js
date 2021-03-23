const DataAccess = require("../../../Data/DataAccess");
const {
  send_notification,
} = require("../../Notification/User/Send/send_notification");
const GetMetPerson = require("../../TracerBuilder/Meetings/get_met_persons");
const GetVisitedVenues = require("../../TracerBuilder/Venues/get_visited_venues");
async function set_positive_test_result(username) {
  const SampleCollection = DataAccess.database.collection("Samples");
  const Sample = SampleCollection.doc(username);
  const ContactTracesCollection = DataAccess.database.collection(
    "ContactTraces"
  );
  const ContactTraceToUpdate = ContactTracesCollection.doc(username);
  try {
    let SampleResultUpdate = await Sample.update({ result: "Positive" });
    let ContactTraceInit = await ContactTraceToUpdate.update({
      infected: true,
    });
    let TraceMeetings = await GetMetPerson.get_met_person(username);
    let TraceVisits = await GetVisitedVenues.get_visited_venues(username);
    if (
      TraceMeetings === "MEETINGS_TRACED" &&
      TraceVisits === "VISITS_TRACED"
    ) {
      let msg = "You have tested positive for COVID-19";
      let type = "warning";
      let notifications = await send_notification(username, msg, type);
      return "TRACE_COMPLETE";
    } else {
      return "ERROR";
    }
  } catch (error) {
    return "ERROR";
  }
}

exports.set_positive_test_result = set_positive_test_result;
