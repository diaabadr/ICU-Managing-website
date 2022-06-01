const mongoose = require("mongoose");

const complaintsSchema = mongoose.Schema({
    compContent: {
    type: String,
    required: true,
  },
  compDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("complaints", complaintsSchema);
