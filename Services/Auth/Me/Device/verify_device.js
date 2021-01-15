const DataAccess = require("../../../../Data/DataAccess");

async function verify_device(deviceid) {
  const DevicesCollection = DataAccess.database.collection("Devices");
  try {
    let device = await DevicesCollection.doc(deviceid).get();
    if (device.exists) {
      let DeviceData = device.data();
      let username = DeviceData.username;
      return username;
    } else {
      return "NON";
    }
  } catch (error) {
    return "ERROR";
  }
}

exports.verify_device = verify_device;
