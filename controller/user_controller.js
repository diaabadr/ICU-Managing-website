const patients = require("../Models/Patient");
const rooms = require("../Models/rooms");
const history = require("../Models/visitinghistory");
const fs = require("fs");


checkPatient = function (req, res, next) {
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
};
module.exports = {
  checkPatient: checkPatient,
};
