const SetNegativeTestResult = require("./Negative/set_negative_test_result");
const SetPositiveTestResult = require("./Positive/set_positive_test_result");

async function test_sample(sample) {
  if (sample.result === "NEGATIVE") {
    let SampleSet = await SetNegativeTestResult.set_negative_test_result(
      sample.username
    );
    return SampleSet;
  } else {
    let SampleSet = await SetPositiveTestResult.set_positive_test_result(
      sample.username
    );
    return SampleSet;
  }
}

exports.test_sample = test_sample;
