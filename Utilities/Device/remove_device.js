const DataAccess = require("../../Data/DataAccess");

async function remove_device(device_id) {
  const DevicesCollection = DataAccess.database.collection("Devices");

  try {
    let remover = await DevicesCollection.doc(device_id).delete();
    return "DEVICE_REMOVED";
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

exports.remove_device = remove_device;
