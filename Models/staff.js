const mongoose = require("mongoose");

const staffSchema = mongoose.Schema({
  empName: {
    type: String,
    requires: true,
  },
  empSSN: {
    type: String,
    required: true,
  },
  empEmail: {
    type: String,
    required: true,
  },
  empPassword: {
    type: String,
    required: true,
  },
  empPosition: {
    type: String,
    required: true,
  },
  empGender: {
    type: String,
    required: true,
  },
  jobStrDate: {
    type: Date,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  empAddress: {
    required: true,
    type: {
      houseNo: Number,
      street: String,
      city: String,
    },
  },
  empPhone: {
    type: String,
    required: true,
  },
  empID: {
    type: String,
    required: true,
    unique: true,
  },
  isFirstTime: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.exports("staff", staffSchema);
