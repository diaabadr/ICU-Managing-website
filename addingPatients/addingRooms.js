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
// rooms.remove({ isBusy: false }, (error, result) => {
//   console.log(result);
//   console.log("done");
// });

let roomArray = [];
for (var i = 1; i < 4; i++) {
  const room = new rooms({
    roomNum: i,
    isBusy: false,
    departement: "Medical",
  });
  roomArray.push(room);
}

for (var i = 4; i < 7; i++) {
  const room = new rooms({
    roomNum: i,
    isBusy: false,
    departement: "Surgical",
  });
  roomArray.push(room);
}
for (var i = 7; i < 10; i++) {
  const room = new rooms({
    roomNum: i,
    isBusy: false,
    departement: "Pediatric",
  });
  roomArray.push(room);
}
for (var i = 10; i < 13; i++) {
  const room = new rooms({
    roomNum: i,
    isBusy: false,
    departement: "Neonatal",
  });
  roomArray.push(room);
}
var done = 0;
for (var i = 0; i < roomArray.length; i++) {
  console.log(i);
  roomArray[i].save((error, result) => {
    if (error) console.log(error);
    else {
      console.log(result);
      done++;
    }
    if (done == roomArray.length) {
      console.log("dis");
      mongoose.disconnect();
    }
  });
}
