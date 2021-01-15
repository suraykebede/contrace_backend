const DataAccess = require("../../../Data/DataAccess");

async function set_negative_test_result(username) {
  const SampleCollection = DataAccess.database.collection("Samples");
  const Sample = SampleCollection.doc(username);

  try {
    Sample.update({ result: "Negative" });
    return "SET_NEGATIVE";
  } catch (error) {
    return "ERROR";
  }
}

exports.set_negative_test_result = set_negative_test_result;
