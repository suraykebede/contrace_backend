const DataAccess = require("../../../Data/DataAccess");

async function user_infection_coordinates() {
  let traced_users = [];
  let traced_users_with_coordinates = [];
  const ContactTracingCollections = DataAccess.database.collection(
    "ContactTraces"
  );
  const UsersCollection = DataAccess.database.collection("Users");
  try {
    let contact_traces = await ContactTracingCollections.get();
    contact_traces.forEach((trace) => {
      console.log("checking " + trace.id);
      let trace_data = trace.data();
      if (trace_data.infected) {
        traced_users.push(trace.id);
      }
    });

    for (let index = 0; index < traced_users.length; index++) {
      let trace_coords_object = {
        home_latitude: 0,
        home_longitude: 0,
        username: "",
      };
      let user_data_getter = await UsersCollection.doc(
        traced_users[index]
      ).get();
      let user_data = user_data_getter.data();
      trace_coords_object.username = traced_users[index];
      trace_coords_object.home_latitude = user_data.home_latitude;
      trace_coords_object.home_longitude = user_data.home_longitude;
      traced_users_with_coordinates.push(trace_coords_object);
    }
    return traced_users_with_coordinates;
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

exports.user_infection_coordinates = user_infection_coordinates;
