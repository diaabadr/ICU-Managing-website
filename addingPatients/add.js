const mongoose = require("mongoose");
const Patient = require("../Models/Patient");
const Visit = require("../Models/visitinghistory");

mongoose.connect(
  "mongodb://127.0.0.1/ICU-Managing-website",
  { useNewUrlParser: true },
  (error) => {
    if (error) console.log(error);
    else console.log("Connected");
  }
);
const patients = [
  new Patient({
    pName: "Mahmoud Samir",
    pSSN: "5000110",
    pbirthDate: new Date("1988-5-5"),
    pGender: "Male",
    pAddress: "October",
    arrivalDate: new Date("2021-12-16"),
    isExist: true,
    pbloodType: "O Negative",
    roomNum: 1,
    pfirstNum: "01011121522",
  }),
  new Patient({
    pName: "Ahmed Hamdy",
    pSSN: "151515",

    pbirthDate: new Date("1998-5-5"),
    pGender: "Male",
    pAddress: "October",
    arrivalDate: new Date("2022-4-16"),
    isExist: false,
    pbloodType: "O Positive",
    roomNum: 2,
    pfirstNum: "01542115220",
  }),
  new Patient({
    pName: "Mohsen Sayed",
    pSSN: "664664",

    pbirthDate: new Date("1999-10-5"),
    pGender: "Male",
    pAddress: "October",
    arrivalDate: new Date("2022-2-16"),
    isExist: false,
    pbloodType: "A Negative",
    roomNum: 3,
    pfirstNum: "01245678912",
  }),
];
// Patient.deleteMany({ pGender:"Male" }, (error, res) => {
//   if (error) console.log(error);
//   else {
//     console.log("done");
//   }
// });

// Patient.find({}, (error, res) => {
//   if (error) console.log(error);
//   else console.log(res);
// });

var done = 0;
const visits = [];
console.log(patients.length);
for (var i = 0; i < patients.length; i++) {
  const ssn = patients[i].pSSN;
  const arrDate = patients[i].arrivalDate;
  const rNum = patients[i].roomNum;
  const check = patients[i].isExist;
  const visit = new Visit({
    patientSSN: ssn,
    arrivalDate: arrDate,
    roomNum: rNum,
  });
  if (!check) {
    visit.leavingDate = new Date("2022-5-5");
  }
  visits.push(visit);
  patients[i].save((error, result) => {
    if (error) console.log(error);
    else {
      console.log(result);
      console.log("ana eluser");
    }
  });
}

for (var i = 0; i < visits.length; i++) {
  visits[i].save((error, result) => {
    if (error) console.log(error);
    else {
      console.log(result);
      done++;
    }
    if (done == visits.length) {
      console.log("dis");
      mongoose.disconnect();
    }
  });
}
