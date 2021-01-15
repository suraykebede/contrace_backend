const DataAccess = require("../../Data/DataAccess");

async function get_all_samples() {
  let samples = [];
  const SamplesCollection = DataAccess.database.collection("Samples");
  try {
    const SamplesData = await SamplesCollection.get();
    SamplesData.forEach((sample) => {
      let sample_data = sample.data();
      if (sample_data.result === "NON") {
        samples.push(sample_data);
      }
    });
    return samples;
  } catch (error) {
    return "ERROR";
  }
}

exports.get_all_samples = get_all_samples;
