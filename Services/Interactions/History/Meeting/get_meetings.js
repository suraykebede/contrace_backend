const DataAccess = require("../../../../Data/DataAccess");

async function get_meetings(username) {
  let Meetings = [];
  const UsersCollection = DataAccess.database.collection("Users");
  const MeetingsCollection = UsersCollection.doc(username).collection(
    "Meetings"
  );
  try {
    let MeetingsData = await MeetingsCollection.get();
    MeetingsData.forEach((Meeting) => {
      let meeting_data = Meeting.data();
      let met_person =
        username === meeting_data.username_one
          ? meeting_data.username_two
          : meeting_data.username_one;
      let meeting_object = {
        met_person: met_person,
        meeting_latitude: meeting_data.meeting_latitude,
        meeting_longitude: meeting_data.meeting_longitude,
        time: meeting_data.time,
        venue: meeting_data.venue,
      };
      Meetings.push(meeting_object);
    });
    return Meetings;
  } catch (error) {
    return "ERROR";
  }
}

exports.get_meetings = get_meetings;
