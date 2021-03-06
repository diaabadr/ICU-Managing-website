const mongoose = require("mongoose");
const bCrypt = require("bcrypt");
const staffSchema = mongoose.Schema({
  empName: {
    type: String,
    required: true,
  },
  empDepartment: {
    type: String,
    required: false,
  },
  empSSN: {
    type: String,
    required: true,
    unique: true,
  },
  empEmail: {
    type: String,
    required: true,
    unique: true,
  },
  empPassword: {
    type: String,
    required: false,
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
    type: String,
    required: true,
  },
  empPhone: {
    type: String,
    required: true,
  },
  isFirstTime: {
    type: Boolean,
    required: true,
  },
  empPosition: {
    type: String,
    required: false,
  },
  empBirthDate:{
    type:Date,
    required:true,
  }
});

staffSchema.methods.hashPassword = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(5), null);
};

staffSchema.methods.comparePassword = function (password) {
  return bCrypt.compareSync(password, this.empPassword);
};

module.exports = mongoose.model("staff", staffSchema);
