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
let flage = false;
router.get("/", (req, res, next) => {
  res.render("index");
});
/* GET users listing. */
router.get("/profile", (req, res, next) => {
  const employee = req.user;
  if (employee.empPosition == "Receptionist") {
    {
      console.log("diaaaa");
      res.redirect("receptionist");
    }
  } else if (employee.empPosition == "Nurse") {
    res.render("./user/nurse");
  } else if (employee.empPosition == "Doctor") {
    res.render("./user/doctor");
  } else if (employee.empPosition == "Admin") {
    res.render("./user/admin");
  }
});

// router.post("/visitor", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("receptionist");
// });
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
              patients.find(
                { isExist: true },
                "pSSN pName arrivalDate roomNum",
                (error, result) => {
                  if (error) console.log(error);
                  else {
                    // console.log(result);
                    let pArray = [];
                    for (var j = 0; j < result.length; j++) {
                      const d = result[j].arrivalDate;
                      var str = d.toString();
                      var a = "";
                      for (var i = 3; i < 15; i++) {
                        a += str[i];
                      }
                      let obj = {
                        ssn: result[j].pSSN,
                        name: result[j].pName,
                        room: result[j].roomNum,
                        arrDate: a,
                      };
                      pArray.push(obj);
                    }
                    fs.writeFile(
                      __dirname + "/../public/mydata.json",
                      JSON.stringify(pArray),
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
            }
          }
        );
      }
    }
  );
  if (flage) {
    res.render("./user/receptionist", { chec: true });
  } else {
    res.render("./user/receptionist", { chec: false });
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
router.post("/check", controller.checkPatient);
router.post("/addPatient", controller.addPatient);

router.post("/addVisitor", (req, res, next) => {
  patients.findOne({ roomNum: req.body.roomNum }, (error, patient) => {
    if (error) {
      console.log(error);
    } else {
      if (patient) {
        if (patient.isExist) {
          const visitor = new visitors({
            vName: req.body.fName + " " + req.body.lName,
            vSSN: req.body.vSSN,
            pSSN: patient.pSSN,
            vPhone: req.body.vPhone,
            visitingDate: new Date(),
            pRoom: patient.roomNum,
          });
          visitor.save((error, resu) => {
            if (error) console.log(error);
            else {
              console.log(resu);
              flage = true;
              res.redirect(`receptionist`);
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

router.post("/checkout", (req, res, next) => {
  patients.findOne({ pSSN: req.body.pSSN, isExist: true }, (error, patient) => {
    if (error) {
      console.log(error);
    } else {
      if (patient) {
        patients.updateOne(
          { pSSN: req.body.pSSN },
          { $set: { isExist: false } },
          (err, patUpdated) => {
            if (err) {
              console.log(err);
            } else {
              console.log(patUpdated);
              rooms.updateOne(
                { roomNum: patient.roomNum },
                { $set: { isBusy: false } },
                (error, roomUpdated) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(roomUpdated);
                    history.updateOne(
                      {
                        pSSN: patient.pSSN,
                        arrivalDate: patient.arrivalDate,
                      },
                      { $set: { leavingDate: new Date() } },
                      (error, updatedHistory) => {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log(updatedHistory);

                          // render here
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      } else {
        //patient not found
      }
    }
  });
});

router.get("/logout", (req, res, next) => {
  req.logOut((error, next) => {
    if (error) {
      return next(error);
    } else res.redirect("/");
  });
});

function isSignin(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect("login");
    return;
  }
  next();
}

module.exports = router;
