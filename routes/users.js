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
const { updateOne } = require("../Models/Patient");
const { config } = require("process");
const staff = require("../Models/staff");
let flage = false;
router.get("/", (req, res, next) => {
  res.render("index");
});
/* GET users listing. */
router.get("/profile", (req, res, next) => {
  const employee = req.user;
  staff.updateOne(
    { empSSN: req.user.empSSN },
    { $set: { isLogged: true } },
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        if (employee.empPosition == "Receptionist") {
          {
            res.redirect("/receptionist");
          }
        } else if (employee.empPosition == "Nurse") {
          {
            console.log(result);
            res.redirect("/nurse");
          }
        } else if (employee.empPosition == "Doctor") {
          res.redirect("/doctor");
        } else if (employee.empPosition == "Admin") {
          res.redirect("/admin");
        }
      }
    }
  );
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

function isSignin(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect("login");
    return;
  }
  next();
}

router.get("/admin", (req, res, next) => {
  res.render("./user/admin");
});

router.get("/logout", (req, res, next) => {
  req.logOut((error, next) => {
    if (error) {
      return next(error);
    } else {
      staff.updateOne(
        { isLogged: true },
        { $set: { isLogged: false } },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            req.user = null;
            req.session.destroy((error, result) => {
              if (error) {
                console.log(error);
              } else {
                res.redirect("/");
              }
            });
          }
        }
      );
    }
  });
});

module.exports = router;
