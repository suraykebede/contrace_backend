const DataAccess = require("../../Data/DataAccess");

async function add_device(device_id, username) {
  console.log(`invoked device: ${device_id} and username: ${username}`);
  const DevicesCollection = DataAccess.database.collection("Devices");
  try {
    let add_this_device = await DevicesCollection.doc(device_id).set({
      username: username,
    });
    return "DEVICE_ADDED";
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

exports.add_device = add_device;
