// libraries

const express = require("express");
const EndPoint = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// utilities

const UserPasswordGetter = require("./Utilities/Providers/user_password_getter");

// services

// -------------- Auth --------------
const AUTH_USER = require("./Services/Auth/User/auth_user");
const AUTH_HEALTH_ADMIN = require("./Services/Auth/HealthAdmin/auth_health_admin");
const AUTH_TESTINGSITE_ADMIN = require("./Services/Auth/TestingSiteAdmin/auth_testingsite_admin");
const AUTH_ME = require("./Services/Auth/Me/auth_me");
const VERIFY_DEVICE = require("./Services/Auth/Me/Device/verify_device");
const DO_I_EXIST = require("./Services/Auth/do_i_exist");

const GRANT_HEALTH_ADMIN = require("./Services/Auth/HealthAdmin/grant_health_admin");
const GRANT_TESTINGSITE_ADMIN = require("./Services/Auth/TestingSiteAdmin/grant_testing_site_admin");
const GRANT_ME = require("./Services/Auth/Me/grant_me");

// ------------- Analytics ------------
const GET_ALL_TRACES = require('./Services/Analytics/Traces/get_all_traces');


// -------------- New Entities --------
const ADD_USER = require("./Services/NewEntities/User/add_user");
const ADD_VENUE = require("./Services/NewEntities/Venue/add_venue");
const ADD_SAMPLE = require("./Services/NewEntities/Sample/add_sample");

// -------------- Interactions ---------

const ADD_MEETING = require("./Services/Interactions/New/Meeting/add_meeting");
const ADD_VISIT = require("./Services/Interactions/New/Visit/add_visit");

// -------------- Testing --------------

const TEST_SAMPLE = require("./Services/Testing/test_sample");

// -------------- History --------------

const GET_MEETINGS = require("./Services/Interactions/History/Meeting/get_meetings");
const GET_VISITS = require("./Services/Interactions/History/Visit/get_visits");

// -------------- DataProviders --------

const IMAGE_GETTER = require("./Services/DataProviders/image_getter");
const USER_FULL_NAME = require("./Services/DataProviders/user_full_name");
const GET_ALL_SAMPLES = require("./Services/DataProviders/get_all_samples");
const GET_ALL_USERNAMES = require("./Services/DataProviders/get_all_usernames");
const GET_PHONENUMBER = require("./Services/DataProviders/get_phonenumber");
const READ_NOTIFICATIONS = require("./Services/Notification/User/Recieve/read_notifications");
const GET_VENUE_NOTIFICATIONS = require("./Services/Notification/Venue/Recieve/read_venue_notifications");
const CURRENT_VENUE = require("./Services/DataProviders/current_venue");
const GET_VENUE_INFORMATION = require('./Services/DataProviders/VenueServices/get_venue_information')
const ADMINS = require("./Services/DataProviders/Admins/admins");

// --------------- Utilities ----------

const ADD_DEVICE = require("./Utilities/Device/add_device");
const REMOVE_DEVICE = require("./Utilities/Device/remove_device");
const CHANGE_USER_COORDINATES = require("./Services/IndicativeMap/Coordinates/change_user_coordinates");

// --------------- Middleware ---------
EndPoint.use(cors());
EndPoint.use(bodyParser.urlencoded({ extended: true, limit: "200mb" }));
EndPoint.use(bodyParser.json({ limit: "200mb" }));
EndPoint.use(bodyParser.text({ limit: 200 }));
EndPoint.use(morgan("dev"));

var PORT = process.env.PORT || 8080;

EndPoint.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

EndPoint.get("/api/test", (req, res) => {
  console.clear();
  res.send({ msg: "test" });
});

EndPoint.get("/api/add_device", async (req, res) => {
  let device_name = req.query.device_name;
  let username = req.query.username;
  let add_device = await ADD_DEVICE.add_device(device_name, username);
  res.send({
    msg: add_device,
  });
});

EndPoint.get("/api/verifyuser", async (req, res) => {
  console.clear();

  let VerifyUser = await DO_I_EXIST.do_i_exist(req.query.username);
  res.send({
    msg: VerifyUser,
  });
});

EndPoint.get("/api/verifydevice", async (req, res) => {
  console.clear();

  let VerifyDevice = await VERIFY_DEVICE.verify_device(req.query.deviceid);
  res.send({
    msg: VerifyDevice,
  });
});

EndPoint.get("/api/auth/user", async (req, res) => {
  console.clear();

  let Auth = await AUTH_USER.auth_user(req.query.username, req.query.password);
  res.send({
    msg: Auth,
  });
});
EndPoint.get("/api/auth/healthadmin", async (req, res) => {
  console.clear();

  let Auth = await AUTH_HEALTH_ADMIN.auth_health_admin(
    req.query.username,
    req.query.password
  );
  res.send({
    msg: Auth,
  });
});
EndPoint.get("/api/auth/testingsiteadmin", async (req, res) => {
  console.clear();

  let Auth = await AUTH_TESTINGSITE_ADMIN.auth_testingsite_admin(
    req.query.username,
    req.query.password
  );
  res.send({
    msg: Auth,
  });
});
EndPoint.get("/api/auth/me", async (req, res) => {
  console.clear();

  let Auth = await AUTH_ME.auth_me(req.query.username, req.query.password);
  res.send({
    msg: Auth,
  });
});

// TODO: notifications
EndPoint.get("/api/notifications/user", async (req, res) => {
  console.clear();

  let username = req.query.username;
  let ReadNotifications = await READ_NOTIFICATIONS.read_notifications(username);
  res.send(ReadNotifications);
});
EndPoint.get("/api/notifications/venue", async (req, res) => {
  let venue = req.query.venue;
  let VenueNotifications = await GET_VENUE_NOTIFICATIONS.read_venue_notification(venue);
  res.send(VenueNotifications);
});

EndPoint.get("/api/imagegetter", async (req, res) => {
  let username = req.query.username;
  let ImageGetter = await IMAGE_GETTER.image_getter(username);
  res.send({
    msg: ImageGetter,
  });
});

EndPoint.get('/api/get_venue_info', async (req, res) => {
  let username = req.query.username;
  let venue_getter = await GET_VENUE_INFORMATION.get_venue_information(username);
  res.send(venue_getter);
})

EndPoint.get("/api/getfullname", async (req, res) => {
  let username = req.query.username;
  let FullnameGetter = await USER_FULL_NAME.user_full_name(username);
  if (req.query.string) {
    let string = `${FullnameGetter.first_name} ${FullnameGetter.last_name}`;
    res.send({
      msg: string,
    });
  } else {
    res.send({
      msg: FullnameGetter,
    });
  }
});

EndPoint.get("/api/get_phonenumber", async (req, res) => {
  let username = req.query.username;
  let PhoneNumber = await GET_PHONENUMBER.get_phonenumber(username);
  res.send({
    msg: PhoneNumber,
  });
});

EndPoint.get("/api/getallsamples", async (req, res) => {
  let SamplesGetter = await GET_ALL_SAMPLES.get_all_samples();
  res.send({
    msg: SamplesGetter,
  });
});

EndPoint.get("/api/getallusernames", async (req, res) => {
  let Users = await GET_ALL_USERNAMES.get_all_usernames();
  res.send({
    msg: Users,
  });
});

EndPoint.get("/api/currentvenue", async (req, res) => {
  let CurrentVenue = await CURRENT_VENUE.current_venue(req.query.username);
  res.send({
    msg: CurrentVenue,
  });
});

EndPoint.post("/api/adduser", async (req, res) => {
  let user = req.body;
  let AddUser = await ADD_USER.add_user(user);
  res.send({
    msg: AddUser,
  });
});
EndPoint.post("/api/addvenue", async (req, res) => {
  let venue = req.body;
  let AddVenue = await ADD_VENUE.add_venue(venue);
  res.send({
    msg: AddVenue,
  });
});
EndPoint.post("/api/addsample", async (req, res) => {
  let Sample = await ADD_SAMPLE.add_sample(req.body);
  res.send({
    msg: Sample,
  });
});

EndPoint.post("/api/testsample", async (req, res) => {
  let Test = await TEST_SAMPLE.test_sample(req.body);
  res.send({
    msg: Test,
  });
});

EndPoint.post("/api/grantprivledge/testingadmin", async (req, res) => {
  let password = await UserPasswordGetter.user_password_getter(
    req.body.username
  );
  if (password !== "ERROR") {
    let grantTestAdmin = await GRANT_TESTINGSITE_ADMIN.grant_testing_site_admin(
      req.body.username,
      password
    );
    res.send({
      msg: grantTestAdmin,
    });
  } else {
    res.send({
      msg: password,
    });
  }
});
EndPoint.post("/api/grantprivledge/healthadmin", async (req, res) => {
  let password = await UserPasswordGetter.user_password_getter(
    req.body.username
  );
  if (password !== "ERROR") {
    let grantHealthAdmin = await GRANT_HEALTH_ADMIN.grant_health_admin(
      req.body.username,
      password
    );
    res.send({
      msg: grantHealthAdmin,
    });
  } else {
    res.send({
      msg: password,
    });
  }
});
EndPoint.post("/api/grantprivledge/me", async (req, res) => {
  let password = await UserPasswordGetter.user_password_getter(
    req.body.username
  );
  if (password !== "ERROR") {
    let grantMe = await GRANT_ME.grant_me(req.body.username, password);
    res.send({
      msg: grantMe,
    });
  } else {
    res.send({
      msg: password,
    });
  }
});

EndPoint.post("/api/change_coords", async (req, res) => {
  let username = req.body.username;
  let new_latitude = req.body.new_latitude;
  let new_longitude = req.body.new_longitude;
  let changer = await CHANGE_USER_COORDINATES.change_user_coordinates(
    username,
    new_latitude,
    new_longitude
  );
  res.send({
    msg: changer,
  });
});

EndPoint.post("/api/history/meetings/add", async (req, res) => {
  let Meeting = await ADD_MEETING.add_meeting(req.body);
  res.send({
    msg: Meeting,
  });
});
EndPoint.post("/api/history/visits/add", async (req, res) => {
  let visit = await ADD_VISIT.add_visit(req.body);
  res.send({
    msg: visit,
  });
});

EndPoint.get("/api/history/meetings", async (req, res) => {
  let meetings = await GET_MEETINGS.get_meetings(req.query.username);
  res.send(meetings);
});
EndPoint.get("/api/history/visits", async (req, res) => {
  let visits = await GET_VISITS.get_visits(req.query.username);
  res.send(visits);
});

EndPoint.get('/api/admins', async (req, res) => {
  let type = req.query.type;
  let admins = await ADMINS.admins(type);
  res.send(admins);

})

// TODO: build analytics
EndPoint.get("/api/alltraces", async (req, res) => {
  let trace_getter = await GET_ALL_TRACES.get_all_traces();
  res.send(trace_getter);
});

// TODO: get coordinates for indicative map
EndPoint.get("/api/coords/", async (req, res) => {});

// TODO: log out
EndPoint.delete("/api/logout", async (req, res) => {
  let device_id = req.query.device_id;
  let remover = await REMOVE_DEVICE.remove_device(device_id);
  res.send({
    msg: remover
  })
})

