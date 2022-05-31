var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const patients = require("../Models/Patient");
const fs = require("fs");
const rooms = require("../Models/rooms");
const history = require("../Models/visitinghistory");
const controller = require("../controller/user_controller");
const visitors = require("../Models/visitors");
router.get("/", (req, res, next) => {
  res.render("index");
});
/* GET users listing. */
router.get("/profile", (req, res, next) => {
  const employee = req.user;
  if (employee.empPosition == "Receptionist") {
    res.redirect("receptionist");
  } else if (employee.empPosition == "Nurse") {
    res.render("./user/nurse");
  } else if (employee.empPosition == "Doctor") {
    res.render("./user/doctor");
  } else if (employee.empPosition == "Admin") {
    res.render("./user/admin");
  }
});

router.post("/visitor", (req, res, next) => {
  console.log(req.body);
  res.redirect("receptionist");
});
router.get("/receptionist", (req, res, next) => {
  rooms.find(
    { isBusy: false },
    "roomNum departement",
    (error, availableRooms) => {
      if (error) {
        console.log(error);
      } else {
        fs.writeFile(
          __dirname + "/../public/availableRooms.json",
          JSON.stringify(availableRooms),
          "utf-8",
          (err, resu) => {
            if (err) console.log(err);
            else {
              console.log(resu);
            }
          }
        );
      }
    }
  );
  res.render("../views/user/receptionist");
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
router.post("/check", controller.checkPatient);
router.post("/addPatient", controller.addPatient);

router.post("/addVisitor", (req, res, next) => {
  patients.findOne({ roomNum: req.body.roomNum }, (error, room) => {
    if (error) {
      console.log(error);
    } else {
      if (room) {
        if (room.isBusy) {
          const visitor = new visitors({
            vName: req.body.fName + " " + req.body.lName,
            vSSN: req.body.vSSN,
            pSSN: room.pSSN,
            vPhone: req.body.vPhone,
            visitingDate: new Date(),
            pRoom: room.roomNum,
          });
          visitor.save((error, resu) => {
            if (error) console.log(error);
            else {
              console.log(resu);
              // render new page
            }
          });
        } else {
          // room is empty
        }
      } else {
        // room doesn't exist
      }
    }
  });
});

module.exports = router;
