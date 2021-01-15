const DataAccess = require("../../../Data/DataAccess");

async function grant_testing_site_admin(username, password) {
  const TestingSiteAdminCollection = DataAccess.database.collection(
    "TestSiteAdmins"
  );
  try {
    const TestingSiteAdmin = await TestingSiteAdminCollection.doc(username).set(
      {
        password: password,
      }
    );
    return "ADMIN_ADDED";
  } catch (error) {
    return "ERROR";
  }
}

exports.grant_testing_site_admin = grant_testing_site_admin;
