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
const users = require("./users").isSignin;
let flage = false;
let message = "";

router.get("/:id", users, (req, res, next) => {
  console.log(req.user);
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
                          // console.log(resu);
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
    res.render("./user/receptionist", { chec: true, message: message });
  } else {
    res.render("./user/receptionist", { chec: false });
  }
});
router.post("/addVisitor", users, (req, res, next) => {
  patients.findOne(
    { roomNum: req.body.roomNum, isExist: true },
    (error, patient) => {
      if (error) {
        console.log(error);
      } else {
        if (patient) {
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
              message = "Visitor added succesfully";
              res.redirect("/users/profile");
            }
          });
        } else {
          message = "Room is Empty!";
          flage = true;
          res.redirect("/users/profile");
        }
      }
    }
  );
});

router.post("/checkout", users, (req, res, next) => {
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
                          message = "checkout successfully";
                          flage = true;
                          res.redirect("/users/profile");
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
        flage = true;
        message = "There is No Patient with that SSN";
        res.redirect("/receptionist/" + req.user.id);
      }
    }
  });
});

// router.post("/back", users, (req, res, next) => {
//   console.log(typeof req.user.id);
//   res.redirect("/receptionist/" + req.user.id);
// });
router.post("/check", users, controller.checkPatient);
router.post("/addPatient", users, (req, res, next) => {
  rooms.findOne(
    { isBusy: false, departement: req.body.departments },
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        const date = new Date();
        if (result) {
          patients.findOne({ pSSN: req.body.pSSN }, (error, found) => {
            if (error) {
              console.log(error);
            } else {
              console.log(found);
              if (found && !found.isExist) {
                patients.updateOne(
                  { pSSN: req.body.pSSN },
                  {
                    $set: {
                      isExist: true,
                      pAddress: req.body.pAddress,
                      pfirstNum: req.body.pNumber,
                      roomNum: result.roomNum,
                      arrivalDate: date,
                    },
                  },
                  (error, existPatient) => {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log(existPatient);
                      rooms.updateOne(
                        { roomNum: result.roomNum },
                        { $set: { isBusy: true, pSSN: req.body.pSSN } },
                        (er, roomUpdated) => {
                          if (er) {
                            console.log(er);
                          } else {
                            console.log(roomUpdated);
                          }
                        }
                      );
                    }
                  }
                );
              } else if (found && found.isExist) {
                message = "Patient already exist";
                flage = true;
                res.redirect("/users/profile");
              } else {
                const patient = new patients({
                  pName: req.body.fName + " " + req.body.lName,
                  pSSN: req.body.pSSN,
                  pGender: req.body.gender,
                  pAddress: req.body.pAddress,
                  roomNum: result.roomNum,
                  pfirstNum: req.body.pNumber,
                  pbirthDate: new Date(req.body.bDate),
                  arrivalDate: date,
                  isExist: true,
                });
                patient.save((err, newPatient) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(newPatient);
                    rooms.updateOne(
                      { roomNum: result.roomNum },
                      { $set: { isBusy: true, pSSN: req.body.pSSN } },
                      (er, roomUpdated) => {
                        if (er) {
                          console.log(er);
                        } else {
                          console.log(roomUpdated);
                        }
                      }
                    );
                  }
                });
              }

              const vHistory = new history({
                roomNum: result.roomNum,
                arrivalDate: date,
                vDepartment: req.body.departments,
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
          flage = true;
          message = "No Room available";
          res.redirect("/users/profile");
        }
      }
    }
  );
});
module.exports = router;
