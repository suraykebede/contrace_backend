const DataAccess = require("../../../Data/DataAccess");
const ImageUploader = require("./ImageService/image_uploader");
const SendNotification = require("../../Notification/User/Send/send_notification");

async function add_user(user) {
  const UsersCollection = DataAccess.database.collection("Users");
  const ContactTraceCollection = DataAccess.database.collection("ContactTraces");
  try {
    //console.log(`show me the users's email ${user.email}`);
    let UserImageUpload = await ImageUploader.image_uploader(user.image);
    if (UserImageUpload !== "ERROR") {
      user.image = UserImageUpload;
      const UserToAdd = await UsersCollection.doc(user.username).set({
        image: user.image,
        username: user.username,
        current_venue: "NON",
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        home_latitude: user.home_latitude,
        home_longitude: user.home_longitude,
        password: user.password,
        phone_number: user.phone_number,
        psh_key: "NON",
        age: user.age,
        gender: user.gender,
      });
      const UserContactTrace = await ContactTraceCollection.doc(user.username).set({
        infected: false,
        other_contacts: [],
        users: [],
        venues: []
      }) 
      let msg = 'Welcome to the TracET';
      let type = 'info';
      let notify = await SendNotification.send_notification(user.username, msg, type);
      if(notify === 'ERROR'){
        return 'ERROR';
      }
      return "USER_ADDED";
    } else {
      return "ERROR";
    }
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

exports.add_user = add_user;
