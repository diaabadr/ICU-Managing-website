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
