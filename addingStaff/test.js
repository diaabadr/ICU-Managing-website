var Diagnosis = require("../Models/dailyDiagnosis");
const visitors = require("../Models/visitors");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://127.0.0.1/ICU-Managing-website",
  { useNewUrlParser: true },
  (error) => {
    if (error) console.log(error);
    else console.log("Connected");
  }
);
let date = new Date().getMinutes().toString();
new Date().ge
console.log(date);
Diagnosis.find({}, (error, result) => {
  console.log(result);
});
