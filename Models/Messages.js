const mongoose = require("mongoose");

const Message = mongoose.Schema({
  From: {
    required: false,
    type: String,
  },
  to: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
  isSeen: {
    type: Boolean,
    required: true,
  },
  pSSN: {
    type: String,
  },
  arrivalDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Message", Message);
