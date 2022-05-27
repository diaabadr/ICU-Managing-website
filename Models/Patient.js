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
    required: true,
    type: {
      houseNo: Number,
      street: String,
      city: String,
    },
  },
  pbloodType: {
    type: String,
    required: false,
  },
  lastEnteringDate: {
    type: Date,
    required: true,
  },
  pfirstNum: {
    type: String,
    required: false,
  },
  pSecondNum: {
    type: String,
    required: false,
  },
  isExist: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("patient", patientSchema);
