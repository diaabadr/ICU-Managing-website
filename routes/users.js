var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const patients = require("../Models/Patient");
const fs = require("fs");
router.get("/", (req, res, next) => {
  res.render("index");
});
/* GET users listing. */
router.get("/profile", (req, res, next) => {
  const employee = req.user;
  if (employee.empPosition == "Receptionist") {
    res.render("./user/receptionist");
  } else if (employee.empPosition == "Nurse") {
    res.render("./user/nurse");
  } else if (employee.empPosition == "Doctor") {
    res.render("./user/doctor");
  } else if (employee.empPosition == "Admin") {
    res.render("./user/admin");
  }
});
router.get("/login", (req, res, next) => {
  var errors = req.flash("loginErrors");
  console.log(errors);
  res.render("./user/login", { errorMessages: errors });
});
router.post(
  "/login",
  [check("email").isEmail().withMessage("Please enter valid email")],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var validationErrors = [];
      for (var i = 0; i < errors.errors.length; i++) {
        validationErrors.push(errors.errors[i].msg);
      }
      req.flash("signinError", validationErrors);
      res.redirect("signin");
      return;
    }
    next();
  },
  passport.authenticate("local-signin", {
    successRedirect: "profile",
    failureRedirect: "login",
    failureFlash: true,
  })
);

// router.get("/addPatient", (req, res, next) => {
//   res.render("./user/doctor")
// })
let pArray = [];
router.post("/check", (req, res, next) => {
  console.log("diaaa");
  console.log(req.body.SSN);
  patients.findOne({ pSSN: req.body.SSN }, (error, patient) => {
    if (error) {
      console.log(error);
    } else {
      if (patient) {
        p = {
          ssn: patient.pSSN,
          name: patient.pName,
          room: patient.roomNum,
          arrDate: patient.arrivalDate,
        };
        pArray.push(p);
        console.log(p);
        var js = JSON.stringify(pArray);
        fs.writeFile(
          __dirname + "/../public/mydata.json",
          js,
          "utf8",
          (error, res) => {}
        );
        pArray.pop();
        res.redirect("/users/profile");
      } else {
        console.log("Notfound");
        fs.writeFile(
          __dirname + "/../public/mydata.json",
          JSON.stringify(pArray),
          "utf8",
          (error, result) => {}
        );
        res.redirect("/users/profile");
      }
    }
  });
});

router.post("/addPatient", (req, res, next) => {
  console.log(req.body);
});

module.exports = router;
