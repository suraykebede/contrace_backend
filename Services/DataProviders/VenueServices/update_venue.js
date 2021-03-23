const DataAccess = require("../../../Data/DataAccess");
const { do_i_exist } = require("../../Auth/do_i_exist");
const {
  send_notification,
} = require("../../Notification/User/Send/send_notification");

async function update_venue(
  venue,
  venue_latitude,
  venue_longitude,
  administrator,
  old_admin
) {
  const VenuesCollection = DataAccess.database.collection("Venues");
  const VenueAdministrators = DataAccess.database.collection(
    "VenueAdministrator"
  );
  try {
    let doiexist = await do_i_exist(administrator);
    if (doiexist === "EXISTS") {
      let changer = await VenuesCollection.doc(venue).update({
        administrator: administrator,
        venue_latitude: venue_latitude,
        venue_longitude: venue_longitude,
      });
      let msg_new_admin = "Admin rights, see venue tab";
      let msg_old_admin = "You are no longer a venue administrator";
      let type = "info";
      let venue_revoke_init = await VenueAdministrators.doc(administrator).set({
        venue: venue,
      });
      let old_admin_notification = await send_notification(
        old_admin,
        msg_old_admin,
        type
      );
      let new_admin_notification = await send_notification(
        administrator,
        msg_new_admin,
        type
      );
      return "CHANGED";
    }

    return "NO_SUCH_USER";
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

exports.update_venue = update_venue;
