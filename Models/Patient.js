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
    default: "",
  },
  pbloodType: {
    type: String,
    required: false,
    default: "",
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
  lastDoctor: {
    type: String,
  },
  progress: {
    type: Number,
  },
  roomNum: {
    type: Number,
    required: true,
  },
  lastNurse: {
    type: String,
  },
});

module.exports = mongoose.model("patient", patientSchema);
