const DataAccess = require("../../Data/DataAccess");

async function summarizer() {
  // function for generating summary reports

  // declaration for the data to return
  let samples = [];
  let venues = [];
  let contact_traces = [];
  let users = [];

  // collections for samples and contact traces
  const SamplesCollection = DataAccess.database.collection("Samples");
  const ContactTracesCollection = DataAccess.database.collection(
    "ContactTraces"
  );
  const VenuesCollection = DataAccess.database.collection("Venues");
  const UsersCollection = DataAccess.database.collection("Users");

  // start going through the samples

  try {
    // get all the samples
    const samples_data = await SamplesCollection.get();

    // iterate though the samples to get all of them
    samples_data.forEach((samples_data_retrieved) => {
      samples_data_extracted = samples_data_retrieved.data();

      // get the result, time of test, and the tested person's username
      const { result, taken_on, username } = samples_data_extracted;
      sample_object = {
        result: result,
        taken_on: taken_on,
        username: username,
      };

      // pushing to the samples array to return at the end
      samples.push(sample_object);
    });

    // getting the contact trace data
    const contact_traces_data = await ContactTracesCollection.get();

    // iterating through the entire collection and filter with positive results
    contact_traces_data.forEach((contact_traces_retrieved) => {
      const contact_traces_extracted = contact_traces_retrieved.data();

      // filtering based on positivity
      if (contact_traces_extracted.infected) {
        // pushing the retrieved data to the array to be sent to the report
        const { users, other_contacts, venues } = contact_traces_extracted;
        const person = contact_traces_retrieved.id;
        contact_traces_object = {
          users: users,
          other_contacts: other_contacts,
          venues: venues,
          person: person
        };

        contact_traces.push(contact_traces_object);
      }
    });
    // getting venues data
    const venues_data = await VenuesCollection.get();

    venues_data.forEach((venues_data_retrieved) => {
      venues_data_extracted = venues_data_retrieved.data();

      // pushing the values to the venues array
      const { venue_name, service, venue_type, venue } = venues_data_extracted;
      let venue_object = {
        venue_name: venue_name,
        service: service,
        venue_type: venue_type,
        venue: venue,
      };

      venues.push(venue_object);
    });

    // getting the values from users collection
    const users_data = await UsersCollection.get();

    // going through each user record
    users_data.forEach((users_data_retrieved) => {
      const user_data_extracted = users_data_retrieved.data();

      // setting the array with the pulled attributes
      const {
        first_name,
        last_name,
        age,
        gender,
        phone_number,
        username,
      } = user_data_extracted;

      let user_object = {
        first_name: first_name,
        last_name: last_name,
        age: age,
        gender: gender,
        phone_number: phone_number,
        username: username,
      };

      users.push(user_object);
    });

    // building the object to be returned
    let summary = {
      users: users,
      venues: venues,
      samples: samples,
      contace_traces: contact_traces,
    };

    // returning object
    return summary;
    
  } catch (error) {
    console.log("error generating report ", error);
    return "ERROR";
  }
}

exports.summarizer = summarizer;