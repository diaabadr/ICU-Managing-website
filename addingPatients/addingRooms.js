var rooms = require("../Models/rooms");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://127.0.0.1/ICU-Managing-website",
  { useNewUrlParser: true },
  (error) => {
    if (error) console.log(error);
    else console.log("Connected");
  }
);
const roomArray = [];
for (var i = 1; i < 11; i++) {
  const room = new rooms({
    roomNum: i,
    isBusy: false,
  });
  roomArray
}

var done = 0;
for (var i = 0; i < staff.length; i++) {
  console.log(i);
  const pos = staff[i].empEmail.substring(staff[i].empEmail.indexOf("@") + 1);
  if (pos == "doctor.com") {
    console.log("doctor");
    staff[i].empPosition = "Doctor";
  } else if (pos == "nurse.com") {
    console.log("Nurse");
    staff[i].empPosition = "Nurse";
  } else if (pos == "recept.com") {
    console.log("recep");
    staff[i].empPosition = "Receptionist";
  }

  staff[i].save((error, result) => {
    if (error) console.log(error);
    else {
      console.log(result);
      done++;
    }
    if (done == staff.length) {
      console.log("dis");
      mongoose.disconnect();
    }
  });
}
