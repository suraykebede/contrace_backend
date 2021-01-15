const DataAccess = require("../../../../Data/DataAccess");
const Verifier = require("./SubServices/verifier");
const SetVenueIdentifier = require("./SubServices/set_venue_identifier");
const KeyGen = require("./SubServices/key_gen");
const GetPshKey = require("./SubServices/get_psh_key");
const IncAttendees = require("./SubServices/inc_attendees");
const DecAttendees = require("./SubServices/dec_attendees");
const InternalLog = require("./internal_log");

async function add_visit(visit) {
  const User = DataAccess.database.collection("Users").doc(visit.username);
  const VisitToAdd = User.collection("Visits");
  try {
    let verification = await Verifier.verifier(visit.username);
    if (verification !== "ERROR") {
      if (verification === "NON") {
        let time_entered = Date.now();
        let time_exited = "NON";
        let psh_key = KeyGen.key_gen(visit.venue);
        const Visit = await VisitToAdd.doc(psh_key).set({
          username: visit.username,
          venue: visit.venue,
          time_entered: time_entered,
          time_exited: time_exited,
        });
        let UserIdentifier = await SetVenueIdentifier.set_venue_identifier(
          visit.username,
          visit.venue,
          psh_key
        );
        if (UserIdentifier === "ERROR") {
          return "ERROR";
        }
        let Increment = await IncAttendees.inc_attendees(visit.venue);
        if (Increment === "ERROR") {
          return "ERROR";
        }
        return "VENUE_ENTERED";
      } else {
        let time_exited = Date.now();
        let key = await GetPshKey.get_psh_key(visit.username);
        const Visit = VisitToAdd.doc(key).update({ time_exited: time_exited });
        let UserIdentifier = await SetVenueIdentifier.set_venue_identifier(
          visit.username,
          "NON",
          "NON"
        );
        if (UserIdentifier === "ERROR") {
          return "ERROR";
        }
        let InternalLogger = await InternalLog.internal_log(
          visit.venue,
          visit.username,
          key
        );
        let Decrement = await DecAttendees.dec_attendees(visit.venue);
        if (InternalLogger === "ERROR" || Decrement === "ERROR") {
          return "ERROR";
        }
        return "VENUE_EXITED";
      }
    } else {
      return "ERROR";
    }
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

exports.add_visit = add_visit;
