const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  roomNum: {
    type: Number,
    required: true,
  },
  isBusy: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("rooms", roomSchema);