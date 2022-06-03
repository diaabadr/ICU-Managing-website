var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const patients = require("../Models/Patient");
const fs = require("fs");
const Staff = require("../Models/staff");
const rooms = require("../Models/rooms");
const history = require("../Models/visitinghistory");
const controller = require("../controller/user_controller");
const visitors = require("../Models/visitors");






module.exports = router;
