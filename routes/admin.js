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
const complaints = require("../Models/complaints");
let flage = false;
let submitMessage = "";
router.get("/:id", users, (req, res, next) => {
  patients.find({ isExist: true }, async (error, pats) => {
    if (error) {
      console.log(error);
    } else {
      let Histories = [];
      for (var i = 0; i < pats.length; i++) {
        try {
          Histories[i] = await history.findOne({
            patientSSN: pats[i].pSSN,
            arrivalDate: pats[i].arrivalDate,
          });
        } catch (error) {}
      }
      let pDocs = [];
      for (var i = 0; i < pats.length; i++) {
        if (pats[i].lastDoctor == "__") {
          pDocs[i] = null;
          continue;
        }
        try {
          pDocs[i] = await Staff.findOne({
            empSSN: pats[i].lastDoctor,
          });
        } catch (error) {}
      }
      let pNurses = [];
      for (var i = 0; i < pats.length; i++) {
        if (pats[i].lastDoctor == "__") {
          pNurses[i] = null;
          continue;
        }
        try {
          pNurses[i] = await Staff.findOne({
            empSSN: pats[i].lastNurse,
          });
        } catch (error) {}
      }
      let patintsAllData = [];
      for (var i = 0; i < pats.length; i++) {
        patintsAllData[i] = {
          name: pats[i].pName,
          room: pats[i].roomNum,
          department: Histories[i].vDepartment,
          compNum: Histories[i].companionInfo.companionPhone,
          doctor: pDocs[i] == null ? "__" : pDocs[i].empName,
          nurse: pNurses[i] == null ? "__" : pNurses[i].empName,
        };
      }
      let doctors = [];
      try {
        doctors = await Staff.find({ empPosition: "Doctor" });
      } catch (error) {}
      let hbsDoctors = [];

      for (var i = 0; i < doctors.length; i++) {
        hbsDoctors[i] = {
          name: doctors[i].empName,
          department: doctors[i].empDepartment,
          Email: doctors[i].empEmail,
          phone: doctors[i].empPhone,
          Salary: doctors[i].salary,
          age: parseInt(
            (new Date() - doctors[i].empBirthDate) / (24 * 365 * 60 * 60 * 1000)
          ),
        };
      }
      let Nurses = [];
      try {
        Nurses = await Staff.find({ empPosition: "Nurse" });
      } catch (error) {}
      let hbsNurses = [];
      for (var i = 0; i < Nurses.length; i++) {
        hbsNurses[i] = {
          name: Nurses[i].empName,
          department: Nurses[i].empDepartment,
          Email: Nurses[i].empEmail,
          phone: Nurses[i].empPhone,
          Salary: Nurses[i].salary,
          age: parseInt(
            (new Date() - Nurses[i].empBirthDate) / (24 * 365 * 60 * 60 * 1000)
          ),
        };
      }
      let receptionists = [];
      try {
        receptionists = await Staff.find({ empPosition: "Receptionist" });
      } catch (error) {}
      let hbsRecptionists = [];
      for (var i = 0; i < receptionists.length; i++) {
        hbsRecptionists[i] = {
          name: receptionists[i].empName,
          Email: receptionists[i].empEmail,
          phone: receptionists[i].empPhone,
          Salary: receptionists[i].salary,
          age: parseInt(
            (new Date() - receptionists[i].empBirthDate) /
              (24 * 365 * 60 * 60 * 1000)
          ),
        };
      }
      // stopped here
      let strDate = new Date().setHours(0, 0, 0, 0);
      let todaysVisitors = [];
      try {
        todaysVisitors = await visitors.find({
          visitingDate: { $lt: new Date(), $gt: strDate },
        });
      } catch (error) {}
      let dayVisitors = [];
      for (var i = 0; i < todaysVisitors.length; i++) {
        dayVisitors[i] = {
          name: todaysVisitors[i].vName,
          phone: todaysVisitors[i].vPhone,
          room: todaysVisitors[i].pRoom,
          arrTime:
            todaysVisitors[i].visitingDate.getHours().toString() +
            ":" +
            todaysVisitors[i].visitingDate.getMinutes().toString(),
        };
      }

      let dayPatients = [];
      let recentpatients = [];
      try {
        dayPatients = await patients.find({
          arrivalDate: { $lt: new Date(), $gt: strDate },
        });
      } catch (error) {}
      for (let i = 0; i < dayPatients.length; i++) {
        recentpatients[i] = {
          name: dayPatients[i].pName,
          age: parseInt(
            (new Date() - dayPatients[i].pbirthDate) /
              (24 * 365 * 60 * 60 * 1000)
          ),
          gender: dayPatients[i].pGender,
        };
      }

      let ourcomplaints = [],
        tenDaysAgo = new Date().setHours(0, 0, 0, 0) - 24 * 1000 * 60 * 60 * 10;
      try {
        ourcomplaints = await complaints.find({
          compDate: { $lt: new Date(), $gt: tenDaysAgo },
        });
      } catch (error) {}
      let patwithoutDoc = [];
      try {
        patwithoutDoc = await patients.find({
          lastDoctor: "__",
          lastNurse: "__",
        });
      } catch (error) {}
      let patDeparts = [];
      for (var i = 0; i < patwithoutDoc.length; i++) {
        try {
          patDeparts[i] = await history.findOne(
            {
              patientSSN: patwithoutDoc[i].pSSN,
              arrivalDate: patwithoutDoc[i].arrivalDate,
            },
            "vDepartment"
          );
        } catch (error) {}
      }

      let availDocs = [];
      for (var i = 0; i < patDeparts.length; i++) {
        try {
          availDocs[i] = await Staff.find({
            empDepartment: patDeparts[i].vDepartment,
            empPosition: "Doctor",
          });
        } catch (error) {}
      }

      let docPatsNum = [];
      for (var i = 0; i < availDocs.length; i++) {
        try {
          docPatsNum[i] = await patients.find({
            isExist: true,
            lastDoctor: availDocs[i].empSSN,
          });
        } catch (error) {}
      }
      let docs = [];
      for (var i = 0; i < availDocs.length; i++) {
        let arr = [];
        for (var j = 0; j < availDocs[i].length; j++) {
          arr[j] = {
            dName: availDocs[i][j].empName,
            pNums: docPatsNum[i].length,
            dPhone: availDocs[i][j].empPhone,
            age: parseInt(
              (new Date() - availDocs[i][j].empBirthDate) /
                (24 * 365 * 60 * 60 * 1000)
            ),
          };
        }
        docs[i] = arr;
      }

      let availNurses = [];
      for (var i = 0; i < patDeparts.length; i++) {
        try {
          availNurses[i] = await Staff.find({
            empDepartment: patDeparts[i].vDepartment,
            empPosition: "Nurse",
          });
        } catch (error) {}
      }
      let NursesPatsNum = [];
      for (var i = 0; i < availNurses.length; i++) {
        try {
          NursesPatsNum[i] = await patients.find({
            isExist: true,
            lastNurse: availNurses[i].empSSN,
          });
        } catch (error) {}
      }
      let Nurse = [];
      for (var i = 0; i < availNurses.length; i++) {
        let arr = [];
        for (var j = 0; j < availNurses[i].length; j++) {
          arr[j] = {
            nName: availNurses[i][j].empName,
            pNums: NursesPatsNum[i].length,
            nPhone: availNurses[i][j].empPhone,
            age: parseInt(
              (new Date() - availNurses[i][j].empBirthDate) /
                (24 * 365 * 60 * 60 * 1000)
            ),
          };
        }
        Nurse[i] = arr;
      }

      let ournewPats = [];
      for (var i = 0; i < patwithoutDoc.length; i++) {
        ournewPats[i] = {
          name: patwithoutDoc[i].pName,
          department: patDeparts[i].vDepartment,
          room: patwithoutDoc[i].roomNum,
          age: parseInt(
            (new Date() - patwithoutDoc[i].pbirthDate) /
              (24 * 365 * 60 * 60 * 1000)
          ),
          gender: patwithoutDoc[i].pGender,
          availableDocs: docs[i],
          availableNurses: Nurse[i],
        };
      }

      res.render("./user/admin", {
        hbsPatients: patintsAllData,
        doctors: hbsDoctors,
        Nurses: hbsNurses,
        receptionists: hbsRecptionists,
        employeesNumbed:
          hbsDoctors.length + hbsNurses.length + hbsRecptionists.length,
        dayVisitors: dayVisitors,
        recentpatients: recentpatients,
        ourcomplaints: ourcomplaints,
        ournewPats: ournewPats,
      });
    }
  });
});

router.post("/addingStaff", users, (req, res, next) => {
  Staff.findOne({ empEmail: req.body.empEmail }, (error, emp) => {
    if (error) {
      console.log(error);
    } else {
      if (!emp) {
        Staff.findOne({ empSSN: req.body.empSSN }, (error, employee) => {
          if (error) {
            console.log(error);
          } else {
            if (!employee) {
              if (req.body.empPosition == "Receptionist") {
                req.body.departments == "__";
              }
              const newEmp = new Staff({
                empName: req.body.fName + " " + req.body.lName,
                empDepartment: req.body.departments,
                empSSN: req.body.empSSN,
                empEmail: req.body.empEmail,
                empPassword: new Staff().hashPassword("123456"),
                empGender: req.body.gender,
                jobStrDate: new Date(),
                salary: req.body.empSalary,
                empAddress: req.body.empAddress,
                empPhone: req.body.empPhone,
                isFirstTime: true,
                empPosition: req.body.empPosition,
                empBirthDate: new Date(req.body.empBirthDate),
              });
              console.log(newEmp);
              newEmp.save((error, newOne) => {
                if (error) {
                  console.log(error);
                } else {
                  // successfully added
                  res.redirect("/users/profile");
                }
              });
            } else {
              req.flash("signupError", "This SSN already exist");
              res.redirect("/users/profile");
            }
          }
        });
      } else {
        req.flash("signupError", "This Email already exist");
        res.redirect("/users/profile");
      }
    }
  });
});

router.post("/assignStaff",users, (req, res, next) => {
  console.log(req.body);
  Staff.findOne({ empName: req.body.nurseName }, (error, Nur) => {
    if (error) {
      console.log(error);
    } else {
      Staff.findOne({ empName: req.body.docName }, (error, doct) => {
        if (error) {
          console.log(error);
        } else {
          patients.updateOne(
            { roomNum: req.body.pRoom, isExist: true },
            { $set: { lastDoctor: doct.empSSN, lastNurse: Nur.empSSN } },
            (error, patien) => {
              if (error) {
                console.log(error);
              } else {
                patients.findOne(
                  { roomNum: req.body.pRoom, isExist: true },
                  (error, patientt) => {
                    if (error) {
                      console.log(error);
                    } else {
                      history.updateOne(
                        {
                          patientSSN: patientt.empSSN,
                          arrivalDate: patientt.arrivalDate,
                        },
                        { $set: { docSSN: doct.empSSN, nurseSSN: Nur.empSSN } },
                        (error, hist) => {
                          if (error) {
                            console.log(error);
                          } else {
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
        }
      });
    }
  });
});

module.exports = router;
