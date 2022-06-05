var Diagnosis = require("../Models/dailyDiagnosis");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://127.0.0.1/ICU-Managing-website",
  { useNewUrlParser: true },
  (error) => {
    if (error) console.log(error);
    else console.log("Connected");
  }
);

const a = [
  new Diagnosis({
    bloodPressure: 30,
    bloodGlucose: 40,
    pSSN: "5000110",
  }),
  new Diagnosis({
    bloodPressure: 40,
    bloodGlucose: 50,
    pSSN: "5000110",
  }),
  new Diagnosis({
    bloodPressure: 10,
    bloodGlucose: 10,
    pSSN: "1010",
  }),
  new Diagnosis({
    bloodPressure: 20,
    bloodGlucose: 30,
    pSSN: "1010",
  }),
];

// var done = 0;
// for (var i = 0; i < a.length; i++) {
//   console.log(i);
//   a[i].save((error, result) => {
//     if (error) console.log(error);
//     else {
//       console.log(result);
//       done++;
//     }
//     if (done == a.length) {
//       console.log("dis");
//       mongoose.disconnect();
//     }
//   });
// }

Diagnosis.find({ }, (error, result) => {
  console.log(result);
});
