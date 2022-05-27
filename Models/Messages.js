const mongoose = require("mongoose");

const Message = mongoose.Schema({
  From: {
    required: true,
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
});

const mongoose = require("Message", Message);
