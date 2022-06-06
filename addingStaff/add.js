var Staff = require("../Models/staff");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://127.0.0.1/ICU-Managing-website",
  { useNewUrlParser: true },
  (error) => {
    if (error) console.log(error);
    else console.log("Connected");
  }
);
// Staff.deleteMany({ isFirstTime: true }, (error, res) => {
//   if (error) console.log(error);
//   else {
//     console.log("done");
//   }
// });
// Staff.find({}, (error, res) => {
//   if (error) console.log(error);
//   else console.log(res);
// });

  // new Staff({
  //   empName: "Ahmed Gamal",
  //   empSSN: "5000110",
  //   empEmail: "ahmedgamal@doctor.com",
  //   empPassword: new Staff().hashPassword("123456"),
  //   empGender: "Male",
  //   jobStrDate: new Date(),
  //   salary: 3000,
  //   empAddress: {
  //     houseNo: 4,
  //     street: "Elmoaez-Cairo",
  //     city: "Cairo",
  //   },

  //   empPhone: "01098157522",
  //   empID: "1052000",
  //   isFirstTime: true,
  // }),
  // new Staff({
  //   empName: "Abdelrahman Yasser",
  //   empSSN: "151210",
  //   empEmail: "abdelrahmanyasser@nurse.com",
  //   empPassword: new Staff().hashPassword("123456"),
  //   empGender: "Male",
  //   jobStrDate: new Date(),
  //   salary: 2000,
  //   empAddress: {
  //     houseNo: 5,
  //     street: "Shobra",
  //     city: "Cairo",
  //   },

  //   empPhone: "01010151010",
  //   empID: "101015",
  //   isFirstTime: true,
  // }),
  // new Staff({
  //   empName: "Ahmed Hassan",
  //   empSSN: "147852147",
  //   empEmail: "ahmedhassan@recept.com",
  //   empPassword: new Staff().hashPassword("123456"),
  //   empGender: "Male",
  //   jobStrDate: new Date(),
  //   salary: 2000,
  //   empAddress: {
  //     houseNo: 3,
  //     street: "harram",
  //     city: "Cairo",
  //   },

  //   empPhone: "01001576999",
  //   empID: "1001576",
  //   isFirstTime: true,
  // }),
  const staff = [
  new Staff({
    empName: "Maryam Megahed",
    empSSN: "12121212",
    empEmail: "maryammegahed@admin.com",
    empPassword: new Staff().hashPassword("123456"),
    empGender: "Female",
    jobStrDate: new Date(),
    salary: 2000000,
    empAddress: "6th of october",
empBirthDate:new Date("1-20-2001"),
    empPhone: "01001576999",
    empID: "12121212",
    isFirstTime: true,
  }),
];

var done = 0;
for (var i = 0; i < staff.length; i++) {
  console.log(i);
  const pos = staff[i].empEmail.substring(staff[i].empEmail.indexOf("@") + 1);
  if (pos == "doctor.com") {
    console.log("doctor");
    staff[i].empPosition = "Doctor";
  } else if (pos == "nurse.com") {
    console.log("Nurse");
    staff[i].empPosition = "Nurse";
  } else if (pos == "recept.com") {
    console.log("recep");
    staff[i].empPosition = "Receptionist";
  } else {
    staff[i].empPosition = "Admin";
  }

  staff[i].save((error, result) => {
    if (error) console.log(error);
    else {
      console.log(result);
      done++;
    }
    if (done == staff.length) {
      console.log("dis");
      mongoose.disconnect();
    }
  });
}
