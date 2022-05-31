const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  roomNum: {
    type: Number,
    required: true,
    unique: true,
  },
  isBusy: {
    type: Boolean,
    required: true,
  },
  departement: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("rooms", roomSchema);
