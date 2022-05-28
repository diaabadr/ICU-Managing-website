var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require("passport");

router.get("/", (req, res, next) => {
  res.render("index");
});
/* GET users listing. */
router.get("/profile", (req, res, next) => {
  const employee = req.user;
  if (employee.empPosition == "Receptionist") {
    res.render("./user/login");
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
  res.render("../views/index.hbs", { errorMessages: errors });
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
    failureRedirect: "/",
    failureFlash: true,
  })
);

module.exports = router;
