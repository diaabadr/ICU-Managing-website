var rooms = require("../Models/rooms");
const patient = require("../Models/Patient");
const history = require("../Models/visitinghistory");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://127.0.0.1/ICU-Managing-website",
  { useNewUrlParser: true },
  (error) => {
    if (error) console.log(error);
    else console.log("Connected");
  }
);
patient.deleteMany((error,result)=>{
    console.log(result);
})
history.deleteMany((error,res)=>{
    console.log(res);
})
rooms.updateMany(
  { isBusy: true },
  { $set: { isBusy: false } },
  (error, res) => {
    console.log(res);
  }
);
