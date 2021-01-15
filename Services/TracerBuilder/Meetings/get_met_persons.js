const DataAccess = require("../../../Data/DataAccess");
const SendNotificationMass = require("../../Notification/User/Send/send_notification_mass");

async function get_met_person(username) {
  let UsersToNotify = [];
  let Message = "Direct contact";
  let FourteenDaysAgo = Date.now() - 1210000000;
  const UserCollection = DataAccess.database.collection("Users");
  const Meetings = UserCollection.doc(username).collection("Meetings");
  const ContactTracesCollection = DataAccess.database.collection(
    "ContactTraces"
  );
  try {
    let meetings = await Meetings.get();
    meetings.forEach((meeting) => {
      let Meeting = meeting.data();
      if (Meeting.time >= FourteenDaysAgo) {
        if (username === Meeting.username_one) {
          if (!UsersToNotify.includes(Meeting.username_two)) {
            UsersToNotify.push(Meeting.username_two);
          }
        } else {
          if (!UsersToNotify.includes(Meeting.username_one)) {
            UsersToNotify.push(Meeting.username_one);
          }
        }
      }
    });
    if (UsersToNotify.length !== 0) {
      let ContactTraceBuilder_Users = await ContactTracesCollection.doc(
        username
      ).update({
        users: UsersToNotify,
      });
    }
    let type = "warning";
    let SendingNotifications = await SendNotificationMass.send_notification_mass(
      UsersToNotify,
      Message,
      type
    );
    if (SendingNotifications === "USERS_NOTIFIED") {
      return "MEETINGS_TRACED";
    } else {
      return "ERROR";
    }
  } catch (error) {
    return "ERROR";
  }
}

exports.get_met_person = get_met_person;
