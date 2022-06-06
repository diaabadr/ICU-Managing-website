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
router.get("/:id", (req, res, next) => {
  patients.find({ isExist: true }, async (error, pats) => {
    if (error) {
      console.log(error);
    } else {
      console.log(pats);
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
      console.log(doctors);
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

      res.render("./user/admin", {
        hbsPatients: patintsAllData,
        doctors: hbsDoctors,
        Nurses: hbsNurses,
        receptionists: hbsRecptionists,
        employeesNumbed:
          hbsDoctors.length + hbsNurses.length + hbsRecptionists.length,
        dayVisitors: dayVisitors,
      });
    }
  });
});

router.post("/addingStaff", (req, res, next) => {
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
                  console.log(newOne);
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

module.exports = router;
