const DataAccess = require("../../../Data/DataAccess");

async function add_sample(sample) {
  let taken_on = Date.now();
  let result = "NON";
  const SampleCollection = DataAccess.database.collection("Samples");
  try {
    const SampleToAdd = await SampleCollection.doc(sample.username).set({
      username: sample.username,
      result: result,
      taken_on: taken_on,
    });
    return "SAMPLE_ADDED";
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

exports.add_sample = add_sample;
