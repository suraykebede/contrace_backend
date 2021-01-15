const DataAccess = require("../../../../Data/DataAccess");

async function add_meeting(meeting) {
  meeting.time = Date.now();
  console.log(JSON.stringify(meeting));
  const UserCollection = DataAccess.database.collection("Users");
  const UserOne = UserCollection.doc(meeting.username_one)
    .collection("Meetings")
    .doc();
  const UserTwo = UserCollection.doc(meeting.username_two)
    .collection("Meetings")
    .doc();
  try {
    const UserInformation = await UserCollection.doc(
      meeting.username_one
    ).get();
    let venue_data = UserInformation.data();
    if (venue_data.current_venue !== "NON") {
      meeting.meeting_longitude = "NON";
      meeting.meeting_latitude = "NON";
    } else {
      meeting.venue = venue_data.current_venue;
    }
    console.log(JSON.stringify(meeting));

    const MeetingUserOne = await UserOne.set(meeting);
    const MeetingUserTwo = await UserTwo.set(meeting);
    return "MEETING_SAVED";
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

exports.add_meeting = add_meeting;
