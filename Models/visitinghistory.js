const mongoose = require("mongoose");

const visitingSchema = mongoose.Schema({
  patientSSN: {
    type: String,
    required: true,
  },
  vDepartment: {
    type: String,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  leavingDate: {
    type: Date,
  },
  docSSN: {
    type: String,
  },
  nurseSSN: {
    type: String,
  },
  report: {
    type: {
      pName: String,
      docName: String,
      diagnosis: String,
      midicines: String,
    },
    required: false,
  },
  roomNum: {
    type: Number,
    required: true,
  },
  companionInfo: {
    // ممكن يتحط في سكيمة الزيارات
    required: false,
    type: {
      companionName: String,
      companionSSN: String,
      companionPhone: String,
    },
  },
});

module.exports = mongoose.model("visitingSchema", visitingSchema);
