var express = require("express");
const patients = require("../Models/Patient");
const vHistory = require("../Models/visitinghistory");
var router = express.Router();
const complaints = require("../Models/complaints");
const dailyDiagnosis = require("../Models/dailyDiagnosis");
const staff = require("../Models/staff");
/* GET home page. */
let flage = false;
let message = "";
router.get("/", function (req, res, next) {
  if (flage) {
    flage = false;
    res.render("index", { check: true, message: message });
  } else {
    res.render("index");
  }
});
router.post("/checkSSN", (req, res, next) => {
  patients.findOne({ pSSN: req.body.pSSN }, (error, patient) => {
    if (error) {
      console.log(error);
    } else {
      if (patient) {
        console.log(patient);
        vHistory.findOne(
          { patientSSN: patient.pSSN, arrivalDate: patient.arrivalDate },
          (err, patientReport) => {
            //vHistory.findOne({patientSSN:patient.pSSN},(err,patientReport)=>{
            if (err) {
              console.log(err);
            } else {
              // console.log(patientReport);
              if (patientReport.report) {
                dailyDiagnosis.findOne(
                  { pSSN: req.body.pSSN, arrivalDate: patient.arrivalDate },
                  (error, diags) => {
                    if (error) {
                      console.log(error);
                    } else {
                      if (diags) {
                        console.log(diags);
                        let age = parseInt(
                          (new Date() - patient.pbirthDate) /
                            (24 * 365 * 60 * 60 * 1000)
                        );
                        let arrDate = patient.arrivalDate.toString();
                        let arrDa = "";
                        for (var i = 3; i < 15; i++) {
                          arrDa += arrDate[i];
                        }
                        console.log(arrDa);

                        staff.findOne(
                          { empSSN: patient.lastDoctor },
                          "empName",
                          (error, doc) => {
                            if (error) {
                              console.log(error);
                            } else {
                              staff.findOne(
                                { empSSN: patient.lastNurse },
                                "empName",
                                (error, nurse) => {
                                  if (error) {
                                    console.log(error);
                                  } else {
                                    res.render("./user/patientFullData", {
                                      patient: patient,
                                      patientReport: patientReport,
                                      diags: diags,
                                      age: age,
                                      arrDate: arrDa,
                                      nurse: nurse,
                                      doc: doc,
                                    });
                                  }
                                }
                              );
                            }
                          }
                        );
                      } else {
                        flage = true;
                        message = "Data isn't ready";
                        res.redirect("/");
                      }
                    }
                  }
                );
              } else {
                flage = true;
                message = "Data isn't ready";
                res.redirect("/");
              }
            }
          }
        );
      } else {
        flage = true;
        message = "Patient doesn't exist";
        res.redirect("/");
      }
    }
  });
});

router.get("/aboutus", (req, res, next) => {
  res.render("./user/patientFullData");
});
router.post("/complaint", (req, res, next) => {
  if (req.body.Complaints != "") {
    const Complaint = new complaints({
      compContent: req.body.Complaints,
      compDate: new Date(),
    });
    Complaint.save((error, comp) => {
      if (error) {
        console.log(error);
      } else {
        console.log(comp);
        flage = true;
        message = "Complain is submitted successfully";
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
