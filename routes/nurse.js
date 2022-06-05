var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const patients = require("../Models/Patient");
const fs = require("fs");
const Staff = require("../Models/staff");
const rooms = require("../Models/rooms");
const history = require("../Models/visitinghistory");
const visitors = require("../Models/visitors");
const Messages = require("../Models/Messages");
const dailyDiagnosis = require("../Models/dailyDiagnosis");
const users = require("./users").isSignin;
let flage = false;
let submitMessage = "";
router.get("/:id",users, (req, res, next) => {
      patients.find(
        { isExist: true, lastNurse: req.user.empSSN },
        async (error, pats) => {
          if (error) {
            console.log(error);
          } else {
            console.log(pats);
            let patientsHistory = [];

            for (var i = 0; i < pats.length; i++) {
              try {
                const pHistory = await history.findOne({
                  patientSSN: pats[i].pSSN,
                  arrivalDate: pats[i].arrivalDate,
                });
                console.log(pHistory);
                if (pHistory) {
                  patientsHistory.push(pHistory);
                }
              } catch (error) {}
            }

            let diagnosisArr = [];

            for (var i = 0; i < pats.length; i++) {
              try {
                diagnosisArr[i] = await dailyDiagnosis.find({
                  pSSN: pats[i].pSSN,
                  arrivalDate: pats[i].arrivalDate,
                });
                // console.log(diagnosis);
              } catch (error) {}
            }
            let presArr = [];
            let gluArr = [];
            for (var i = 0; i < diagnosisArr.length; i++) {
              let pArr = [];
              let gArr = [];
              for (var j = 0; j < diagnosisArr[i].length; j++) {
                pArr.push(diagnosisArr[i][j].bloodPressure);
                gArr.push(diagnosisArr[i][j].bloodGlucose);
              }
              presArr.push(pArr);
              gluArr.push(gArr);
            }

            let messagesArr = [];
            for (var i = 0; i < pats.length; i++) {
              try {
                messagesArr[i] = await Messages.find({
                  to: req.user.empSSN,
                  pSSN: pats[i].pSSN,
                  arrivalDate: pats[i].arrivalDate,
                  isSeen: false,
                });
              } catch (error) {}
            }
            let messages = [];
            for (var i = 0; i < messagesArr.length; i++) {
              let msgs = [];
              for (var j = 0; j < messagesArr[i].length; j++) {
                msgs.push(messagesArr[i][j].msg);
              }
              messages.push(msgs);
            }
            let finalArray = [];
            for (var i = 0; i < pats.length; i++) {
              let p = {
                ssn: pats[i].pSSN,
                name: pats[i].pName,
                age: parseInt(
                  (new Date() - pats[i].pbirthDate) /
                    (24 * 365 * 60 * 60 * 1000)
                ),
                prog: pats[i].progress.toString() + "%",
                room: pats[i].roomNum,
                bp: presArr[i],
                bloodType: pats[i].pbloodType,
                ID: patientsHistory[i].report.diagnosis,
                Medicines: patientsHistory[i].report.midicines,
                docMessage: messages[i],
                bs: gluArr[i],
              };
              console.log(p);
              finalArray.push(p);
            }
            fs.writeFile(
              __dirname + "/../public/nursePatients.json",
              JSON.stringify(finalArray),
              "utf-8",
              (err, resu) => {
                if (err) console.log(err);
                else {
                  console.log(resu);
                }
              }
            );
            if (flage) {
              res.render("./user/nurse", {
                check: true,
                message: submitMessage,
              });
            } else {
              res.render("./user/nurse", { check: false });
            }
          }
        }
      );
});

router.post("/dailyDiagnosis", users,(req, res, next) => {
  if (req.body.bloodGlucose != "") {
    patients.updateOne(
      { pSSN: req.body.pSSN },
      { $set: { progress: req.body.progress } },
      (error, patUpdated) => {
        if (error) {
          console.log(error);
        } else {
          patients.findOne({ pSSN: req.body.pSSN }, (error, pat) => {
            const diag = new dailyDiagnosis({
              bloodPressure: req.body.bloodPressure,
              bloodGlucose: req.body.bloodGlucose,
              pSSN: req.body.pSSN,
              diagDate: new Date(),
              arrivalDate: pat.arrivalDate,
            });
            diag.save((error, diagnosis) => {
              if (error) {
                console.log(error);
              } else {
                console.log("diagnosis");
                console.log(diagnosis);
                Messages.updateMany(
                  { isSeen: false, to: pat.lastNurse, pSSN: pat.pSSN },
                  { $set: { isSeen: true } },
                  (error, msgUpdated) => {
                    if (error) {
                      console.log(error);
                    } else {
                      if (req.body.notes === "") {
                        submitMessage = "Data are sent Successfully";
                        flage = true;
                        res.redirect("/users/profile");
                      } else {
                        const msg = new Messages({
                          From: pat.lastNurse,
                          to: pat.lastDoctor,
                          msg: req.body.notes,
                          isSeen: false,
                          pSSN: req.body.pSSN,
                          arrivalDate: pat.arrivalDate,
                        });
                        msg.save((error, message) => {
                          if (error) {
                            console.log(error);
                          } else {
                            console.log(message);
                            submitMessage = "Data are sent Successfully";
                            flage = true;
                            res.redirect("/users/profile");
                          }
                        });
                      }
                    }
                  }
                );
              }
            });
          });
        }
      }
    );
  } else {
    patients.findOne({ pSSN: req.body.pSSN }, (error, pat) => {
      if (error) {
        console.log(error);
      } else {
        if (req.body.notes === "") {
          submitMessage = "Data are sent Successfully";
          flage = true;
          res.redirect("/users/profile");
        } else {
          const msg = new Messages({
            From: pat.lastNurse,
            to: pat.lastDoctor,
            msg: req.body.notes,
            isSeen: false,
            pSSN: req.body.pSSN,
            arrivalDate: pat.arrivalDate,
          });
          msg.save((error, message) => {
            if (error) {
              console.log(error);
            } else {
              Messages.updateMany({ isSeen: false, to: pat.lastNurse, pSSN: pat.pSSN },
                { $set: { isSeen: true } },(error,up)=>{
                  if(error)
                  {
                    console.log(error)
                  }
                  else
                  {
                    submitMessage = "Data are sent Successfully";
                    flage = true;
                    res.redirect("/users/profile");
                  }
                })
              
            }
          });
        }
      }
    });
  }
});

module.exports = router;
