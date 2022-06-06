var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require("passport");
let flage = false;
router.get("/", (req, res, next) => {
  res.render("index");
});
/* GET users listing. */
router.get("/profile", (req, res, next) => {
  const employee = req.user;
  if (employee.empPosition == "Receptionist") {
    res.redirect("/receptionist/" + req.user.id);
  } else if (employee.empPosition == "Nurse") {
    res.redirect("/nurse/" + req.user.id);
  } else if (employee.empPosition == "Doctor") {
    res.redirect("/doctor/" + req.user.id);
  } else if (employee.empPosition == "Admin") {
    res.redirect("/admin/" + req.user.id);
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
      req.flash("loginErrors", validationErrors);
      res.redirect("login");
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
    res.redirect("/users/login");
    return;
  }
  next();
}

router.get("/logout", (req, res, next) => {
  req.logOut((error, next) => {
    if (error) {
      return next(error);
    } else {
      res.redirect("/");
    }
  });
});

module.exports = { router: router, isSignin: isSignin };
