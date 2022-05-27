const mongoose = require("mongoose");

const Message = mongoose.Schema({
  From: {
    required: false,
    type: {
      docEmail: String,
      docName: String,
    },
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
    type: required,
  },
});

const mongoose = require("Message", Message);
