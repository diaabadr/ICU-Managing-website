var express = require("express");
const patients = require("../Models/Patient");
const vHistory = require("../Models/visitinghistory");
var router = express.Router();
const complaints = require("../Models/complaints");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/checkSSN", (req, res, next) => {
  console.log(req.body.SSN);
  patients.findOne({ pSSN: req.body.SSN }, (error, patient) => {
    if (error) {
      console.log(error);
    } else {
      if (patient) {
        console.log(patient.arrivalDate);
        console.log(patient.pSSN);
        vHistory.findOne(
          { patientSSN: patient.pSSN, arrivalDate: patient.arrivalDate },
          (err, patientReport) => {
            //vHistory.findOne({patientSSN:patient.pSSN},(err,patientReport)=>{
            if (err) {
              console.log(err);
            } else {
              // console.log(patientReport);
              console.log(patientReport.report);
            }
          }
        );
      } else {
        // if no patient with this ssn exists
      }
    }
  });
});

router.post("/complaint", (req, res, next) => {
  const Complaint = new complaints({
    compContent: req.body.Complaints,
    compDate: new Date(),
  });
  Complaint.save((error, comp) => {
    if (error) {
      console.log(error);
    } else {
      console.log(comp);
      // rendering
    }
  });
});

module.exports = router;
