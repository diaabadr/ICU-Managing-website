const mongoose = require("mongoose");

const dailySchema = mongoose.Schema({
  bloodPressure: {
    type: String,
  },
  bloodGlucose: {
    type: String,
  },
  pSSN: {
    type: String,
  },
  diagDate: {
    type: Date,
  },
  arrivalDate: {
    type: Date,
  },
});

module.exports = mongoose.model("dailyDiag", dailySchema);
