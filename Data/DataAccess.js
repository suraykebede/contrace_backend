const admin = require("firebase-admin");
const serviceAccount = (packageName = require("../Secrets/final-project-contact-tracing-firebase-adminsdk-ny145-fda2b937eb.json"));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const database = admin.firestore();

exports.database = database;
