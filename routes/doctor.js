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
    { isExist: true, lastDoctor: req.user.empSSN },
    async (error, pats) => {
      if (error) {
        console.log(error);
      } else {
        if (pats) {
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
              pArr.push(parseInt(diagnosisArr[i][j].bloodPressure));
              gArr.push(parseInt(diagnosisArr[i][j].bloodGlucose));
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
            console.log(patientsHistory[i].report.diagnosis);
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
                (new Date() - pats[i].pbirthDate) / (24 * 365 * 60 * 60 * 1000)
              ),
              prog: pats[i].progress.toString() + "%",
              room: pats[i].roomNum,
              bp: presArr[i],
              bloodType: pats[i].pbloodType,
              ID: patientsHistory[i].report.diagnosis,
              Medicines: patientsHistory[i].report.midicines,
              nuresMessage: messages[i],
              bs: gluArr[i],
            };
            console.log(p);
            finalArray.push(p);
          }
          fs.writeFile(
            __dirname + "/../public/doctorPatients.json",
            JSON.stringify(finalArray),
            "utf-8",
            (err, resu) => {
              if (err) console.log(err);
              else {
                console.log(resu);
                if (flage) {
                  res.render("./user/doctor", {
                    check: true,
                    message: submitMessage,
                  });
                } else {
                  res.render("./user/doctor", { check: false });
                }
              }
            }
          );
        } else {
          res.render("./user/doctor");
        }
      }
    }
  );
});

router.post("/docDiagnosis",users, (req, res, next) => {
  if (typeof req.body.bloodType == typeof undefined) {
    console.log("blood1");
    if (typeof req.body.medicines == typeof undefined) {
      console.log("midicine1");
      if (typeof req.body.initialDiag == typeof undefined) {
        console.log("ID1");
        // do nothing
      } else {
        console.log("ID done 1");
        history.updateOne(
          { pSSN: req.body.pSSN },
          { $set: { report: { diagnosis: req.body.initialDiag } } },
          (error, result) => {
            if (error) {
              console.log(error);
            } else {
              console.log(result);
            }
          }
        );
      }
    } else if (typeof req.body.initialDiag == typeof undefined) {
      if (typeof req.body.medicines == typeof undefined) {
        // do nothing
      } else {
        console.log("ID2");
        history.updateOne(
          { pSSN: req.body.pSSN },
          { $set: { report: { midicines: req.body.medicines } } },
          (error, result) => {
            if (error) {
              console.log(error);
            } else {
              console.log("midicine Updated");
              console.log(result);
            }
          }
        );
      }
    } else {
      patients.findOne({ pSSN: req.body.pSSN }, (error, p) => {
        if (error) {
          console.log(error);
        } else {
          history.updateOne(
            { patientSSN: req.body.pSSN, arrivalDate: p.arrivalDate },
            {
              $set: {
                report: {
                  diagnosis: req.body.initialDiag,
                  midicines: req.body.medicines,
                },
              },
            },
            (error, result) => {
              if (error) {
                console.log(error);
              } else {
                console.log(result);
              }
            }
          );
        }
      });
    }
  } else {
    patients.findOne({ pSSN: req.body.pSSN }, (error, p) => {
      if (error) {
        console.log(error);
      } else {
        console.log(req.body);
        history.updateOne(
          { patientSSN: req.body.pSSN, arrivalDate: p.arrivalDate },
          {
            $set: {
              report: {
                diagnosis: req.body.initialDiag,
                midicines: req.body.medicines,
              },
            },
          },
          (error, result) => {
            if (error) {
              console.log(error);
            } else {
              patients.updateOne(
                { pSSN: req.body.pSSN },
                { $set: { pbloodType: req.body.bloodType } },
                (error, resu) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(resu);
                  }
                }
              );
            }
          }
        );
      }
    });
  }

  patients.findOne({ pSSN: req.body.pSSN }, (error, pat) => {
    if (error) {
      console.log(error);
    } else {
      console.log(pat);
      if (req.body.notes !== "") {
        const msg = new Messages({
          to: pat.lastNurse,
          msg: req.body.notes,
          isSeen: false,
          pSSN: req.body.pSSN,
          arrivalDate: pat.arrivalDate,
        });
        msg.save((error, Msg) => {
          if (error) {
            console.log(error);
          } else {
            console.log(Msg);
          }
        });
      }
      Messages.updateMany(
        { isSeen: false, to: pat.lastDoctor, pSSN: req.body.pSSN },
        { $set: { isSeen: true } },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            console.log(result);
          }
        }
      );
      flage = true;
      submitMessage = "Data are sent Successfully";
      res.redirect("/users/profile");
    }
  });
});

module.exports = router;
