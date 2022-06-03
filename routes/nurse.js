var express = require("express");
var promise = require("promise");
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
router.get("/", (req, res, next) => {
  Staff.findOne({ isLogged: true, empPosition: "Nurse" }, (error, nurse) => {
    if (error) {
      console.log(error);
    } else {
      console.log(nurse);
      patients.find(
        { isExist: true, lastNurse: nurse.empSSN },
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
                  to: nurse.empSSN,
                  pSSN: pats[i].pSSN,
                  arrivalDate: pats[i].arrivalDate,
                  isSeen: false,
                });
              } catch (error) {}
            }
            let messages=[]
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
                prog: pats[i].progress,
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
            
            res.render("./user/nurse");
          }
        }
      );
    }
  });
});

module.exports = router;
