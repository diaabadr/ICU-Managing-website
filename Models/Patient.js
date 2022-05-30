const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  pName: {
    type: String,
    required: true,
  },
  pSSN: {
    type: String,
    required: true,
    unique: true,
  },

  pbirthDate: {
    type: Date,
    required: true,
  },
  pGender: {
    type: String,
    required: true,
  },
  pAddress: {
    required: false,
    type: String,
  },
  pbloodType: {
    type: String,
    required: false,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  pfirstNum: {
    type: String,
    required: false,
  },
  isExist: {
    type: Boolean,
    required: true,
  },
  roomNum: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("patient", patientSchema);
