const patients = require("../Models/Patient");
const rooms = require("../Models/rooms");
const history = require("../Models/visitinghistory");
const fs = require("fs");
addPatient = function (req, res, next) {
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
              if (found) {
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
                  arrivalDate: date,
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
                { $set: { isBusy: true, pSSN: req.body.pSSN } },
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
                arrivalDate: date,
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
                        fs.writeFile(
                          __dirname + "/../public/mydata.json",
                          JSON.stringify(pArray),
                          "utf-8",
                          (err, resu) => {
                            if (err) console.log(err);
                            else {
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
};

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
module.exports = { addPatient: addPatient, checkPatient: checkPatient };
