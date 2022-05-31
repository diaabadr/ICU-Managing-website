const mongoose = require("mongoose");
const visitorsSchema = mongoose.Schema({
  vName: {
    type: String,
    required: true,
  },
  vSSN: {
    type: String,
    required: true,
  },
  pSSN: {
    type: String,
    required: true,
  },
  vPhone: {
    type: String,
    required: true,
  },
  pRoom: {
    type: Number,
    required: true,
  },
  visitingDate: {
    type: Date,
    required: true,
  },
});
