var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const patients = require("../Models/Patient");
const fs = require("fs");
const rooms = require("../Models/rooms");
const history = require("../Models/visitinghistory");

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

router.get("/receptionist", (req, res, next) => {
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

// router.get("/addPatient", (req, res, next) => {
//   res.render("./user/doctor")
// })

router.post("/check", (req, res, next) => {
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

        var js = JSON.stringify(p);
        fs.writeFile(
          __dirname + "/../public/mydata.json",
          js,
          "utf8",
          (error, res) => {
            if (error) console.log(error);
          }
        );
        res.redirect("/users/profile");
      } else {
        res.redirect("/users/profile");
      }
    }
  });
});
router.post("/addPatient", (req, res, next) => {
  rooms.findOne(
    { isBusy: false, departement: req.body.departments },
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(req.body.bDate);
        console.log(result);
        console.log(req.body.lName);

        if (result) {
          patients.findOne({ pSSN: req.body.pSSN }, (error, found) => {
            if (error) {
              console.log(error);
            } else {
              if (found) {
                patients.updateOne(
                  { pSSN: req.body.pSSN },
                  {
                    $set: {
                      isExist: true,
                      roomNum: result.roomNum,
                      arrivalDate: new Date(),
                    },
                  },
                  (error, existPatient) => {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log(existPatient);
                    }
                  }
                );
              } else {
                const patient = new patients({
                  pName: req.body.fName + " " + req.body.lName,
                  pSSN: req.body.pSSN,
                  pGender: req.body.gender,
                  pAddress: req.body.pAddress,
                  roomNum: result.roomNum,
                  pfirstNum: req.body.pNumber,
                  pbirthDate: new Date(req.body.bDate),
                  arrivalDate: new Date(),
                  isExist: true,
                });
                patient.save((err, newPatient) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(newPatient);
                  }
                });
              }

              rooms.updateOne(
                { roomNum: result.roomNum },
                { $set: { isBusy: true } },
                (er, roomUpdated) => {
                  if (er) {
                    console.log(er);
                  } else {
                    console.log(roomUpdated);
                  }
                }
              );
              const vHistory = new history({
                roomNum: result.roomNum,
                arrivalDate: new Date(),
                patientSSN: req.body.pSSN,
                companionInfo: {
                  companionName: req.body.compName,
                  companionSSN: req.body.comSSN,
                  companionPhone: req.body.compPhone,
                },
              });

              vHistory.save((errr, ress) => {
                if (errr) {
                  console.log(errr);
                } else {
                  console.log(ress);

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
                        console.log(pArray);
                        console.log(pArray);
                        fs.writeFile(
                          __dirname + "/../public/mydata.json",
                          JSON.stringify(pArray),
                          "utf-8",
                          (err, resu) => {
                            if (err) console.log(err);
                            else {
                              console.log("dadadadadadada");
                              console.log(resu);
                            }
                          }
                        );
                      }
                    }
                  );

                  //when yasser prepare this page
                }
                let patientData = {
                  name: req.body.fName + " " + req.body.lName,
                  SSN: req.body.pSSN,
                  address: req.body.pAddress,
                  phone: req.body.pNumber,
                  department: req.body.departments,
                  room: result.roomNum,
                };
                res.render("./user/patientAdded", { patient: patientData });
              });
            }
          });
        } else {
          res.render("./user/nurse");
        }
      }
    }
  );
});

module.exports = router;
