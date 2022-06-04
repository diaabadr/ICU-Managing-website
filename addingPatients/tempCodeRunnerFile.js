const patients = [
  new Patient({
    pName: "Mahmoud Samir",
    pSSN: "5000110",
    pbirthDate: new Date("1988-5-5"),
    pGender: "Male",
    pAddress: "October",
    arrivalDate: new Date("2021-12-16"),
    isExist: true,
    pbloodType: "O+",
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
    isExist: true,
    pbloodType: "O+",
    roomNum: 2,
    pfirstNum: "01542115220",
    lastNurse:"151210",
    progress:70,
    lastDoctor:"5000110"
  }),
  new Patient({
    pName: "Mohsen Sayed",
    pSSN: "664664",

    pbirthDate: new Date("1999-10-5"),
    pGender: "Male",
    pAddress: "October",
    arrivalDate: new Date("2022-2-16"),
    isExist: true,
    progress:50,
    roomNum: 3,
    pfirstNum: "01245678912",
    lastNurse: "151210",
    lastDoctor:"5000110"
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
    report: {
      midicines: "congestal",
    },
    vDepartment: "Medical",
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
  });
}

let msgs = [
  new Messages({
    to: "151210",
    msg: "Mohsen elmareed",
    isSeen: false,
    pSSN: "664664",
    arrivalDate: new Date("2022-2-16"),
  }),
  new Messages({
    to: "151210",
    msg: "Mohsen elmareed 2 ",
    isSeen: false,
    pSSN: "664664",
    arrivalDate: new Date("2022-2-16"),
  }),
  new Messages({
    to: "151210",
    msg: "Mohsen elmareed 3",
    isSeen: false,
    pSSN: "664664",
    arrivalDate: new Date("2022-2-16"),
  }),
  new Messages({
    to: "151210",
    msg: "mared 2",
    isSeen: false,
    pSSN: "151515",
    arrivalDate: new Date("2022-4-16"),
  }),
  new Messages({
    to: "151210",
    msg: "mared 22 ",
    isSeen: false,
    pSSN: "151515",
    arrivalDate: new Date("2022-4-16"),
  }),
  new Messages({
    to: "5000110",
    msg: "Ahmed",
    isSeen: false,
    pSSN: "151515",
    arrivalDate: new Date("2022-4-16"),
  }),
  new Messages({
    to: "5000110",
    msg: "Mohsen ",
    isSeen: false,
    pSSN: "664664",
    arrivalDate: new Date("2022-2-16"),
  }),
];

let a = [
  new diag({
    bloodPressure: 20,
    bloodGlucose: 30,
    pSSN: "664664",
    arrivalDate: new Date("2022-2-16"),
  }),
  new diag({
    bloodPressure: 40,
    bloodGlucose: 50,
    pSSN: "664664",
    arrivalDate: new Date("2022-2-16"),
  }),
  new diag({
    bloodPressure: 50,
    bloodGlucose: 60,
    pSSN: "664664",
    arrivalDate: new Date("2022-2-16"),
  }),
  new diag({
    bloodPressure: 80,
    bloodGlucose: 80,
    pSSN: "151515",
    arrivalDate: new Date("2022-4-16"),
  }),
  new diag({
    bloodPressure: 90,
    bloodGlucose: 90,
    pSSN: "151515",
    arrivalDate: new Date("2022-4-16"),
  }),

];

for (var i = 0; i < msgs.length; i++) {
  msgs[i].save((error, result) => {
    if (error) console.log(error);
    else {
      console.log(result);
      done++;
    }
  });
}

for (var i = 0; i < a.length; i++) {
  a[i].save((error, result) => {
    if (error) console.log(error);
    else {
      console.log(result);
      done++;
    }
  });
}