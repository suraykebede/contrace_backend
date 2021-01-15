const DataAccess = require("../../../Data/DataAccess");

async function admins(type) {
  console.log(type);
  const TestingAdminsCollection = DataAccess.database.collection(
    "TestSiteAdmins"
  );
  const HealthAdminsCollection = DataAccess.database.collection("HealthAdmin");
  try {
    if (type === "health") {
      console.log("health");
      let health_admins = [];
      let health_query = await HealthAdminsCollection.get();
      health_query.forEach((health_data) => {
        health_admins.push(health_data.id);
      });
      return health_admins;
    } else {
      console.log("testing");
      let testing_admins = [];
      let testing_query = await TestingAdminsCollection.get();
      testing_query.forEach((testing_data) => {
        testing_admins.push(testing_data.id);
      });
      return testing_admins;
    }
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

exports.admins = admins;
