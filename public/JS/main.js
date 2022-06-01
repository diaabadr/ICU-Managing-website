let nurse = document.querySelector(".home-body .img .image");
let homeCard = document.querySelector(".home-body .card");
let loginPage = document.querySelector(".login-page");
let visitorPage = document.querySelector(".visitor-page");
let showVisitor = document.querySelector(".show-visitor");
let showLogin = document.querySelector(".show-login");
let visitorCardShow = document.querySelector(".rec-vi-card");
let patientCardHide = document.querySelector(".rec-pa-card");
let recVisitor = document.querySelector(".receptionist-visitor-card");
let patientFormShow = document.querySelector(".rec-pa-form");
let patientCheckoutFormShow = document.querySelector(".paCheckout");
let visitorFormShow = document.querySelector(".rec-vi-form");
let patientCheckFormShow = document.querySelector(".rec-pach-form");
let patientCheckSearchHide = document.querySelector(".rec-pach-search");
let patientCheckResultShow = document.querySelector(".rec-pach-result");
let cancelCard = document.querySelector(".cancel-card");
let cancelCardContains = document.querySelector(".cancel-card-contains");

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("home-btn")) {
    location.assign("/");
  }
  if (e.target.classList.contains("login-back")) {
    location.assign("/");
  }
  if (e.target.classList.contains("back")) {
    nurse.classList.remove("image-transform");
    homeCard.classList.remove("card-transform");
    loginPage.classList.remove("login-page-show");
    visitorPage.classList.remove("visitor-page-show");
    showVisitor.style.display = "none";
    showLogin.style.display = "none";
  }
  if (e.target.classList.contains("login")) {
    nurse.classList.add("image-transform");
    homeCard.classList.add("card-transform");
    loginPage.classList.add("login-page-show");
    showLogin.style.display = "block";
  }
  if (e.target.classList.contains("visitor")) {
    nurse.classList.add("image-transform");
    homeCard.classList.add("card-transform");
    visitorPage.classList.add("visitor-page-show");
    showVisitor.style.display = "block";
  }
  if (e.target.classList.contains("log-out")) {
    cancelCard.classList.add("cancel-card-show")
    cancelCardContains.classList.add("cancel-card-contains-show")
  }
  if (e.target.classList.contains("cancel")) {
    cancelCard.classList.remove("cancel-card-show")
    cancelCardContains.classList.remove("cancel-card-contains-show")
  }
  if (e.target.classList.contains("rec-pa-button-btn")) {
    patientCardHide.classList.add("rec-pa-card-hide");
    patientFormShow.classList.add("rec-pa-form-show");
    patientCardHide.classList.remove("scroll");
  }
  if (e.target.classList.contains("rec-vi-button-btn")) {
    visitorFormShow.classList.add("rec-vi-form-show");
    visitorCardShow.classList.remove("scroll");
    visitorCardShow.classList.remove("rec-vi-card-show");
  }
  if (e.target.classList.contains("rec-visitor-form-btn-close")) {
    visitorFormShow.classList.remove("rec-vi-form-show");
    visitorCardShow.classList.add("scroll");
    visitorCardShow.classList.add("rec-vi-card-show");
    visitorAdded.innerHTML = ""
  }
  if (e.target.classList.contains("rec-pach-button-btn")) {
    patientCardHide.classList.add("rec-pa-card-hide");
    patientCheckFormShow.classList.add("rec-pach-form-show");
    patientCardHide.classList.remove("scroll");
  }
  if (e.target.classList.contains("rec-paCheckout-button-btn")) {
    patientCardHide.classList.add("rec-pa-card-hide");
    patientCheckoutFormShow.classList.add("paCheckout-show");
    patientCardHide.classList.remove("scroll");
  }
  if (e.target.classList.contains("rec-form-btn-close")) {
    patientCardHide.classList.remove("rec-pa-card-hide");
    patientFormShow.classList.remove("rec-pa-form-show");
    patientCheckFormShow.classList.remove("rec-pach-form-show");
    patientCheckoutFormShow.classList.remove("paCheckout-show");
    patientCardHide.classList.add("scroll");
    searchError.innerHTML = "";
    searchSSN.value = "";
    checkOutError.innerHTML = "";
    checkOutSSN.value = "";
  }

  if (e.target.classList.contains("rec-form-result-btn-close")) {
    patientCheckSearchHide.classList.remove("rec-pach-search-hide");
    patientCheckResultShow.classList.remove("rec-pach-result-show");
    searchError.innerHTML = "";
    searchSSN.value = "";
  }
  if (e.target.classList.contains("rec-form-result-btn-back")) {
    patientCheckSearchHide.classList.remove("rec-pach-search-hide");
    patientCheckResultShow.classList.remove("rec-pach-result-show");
  }
});

let searchSSN = document.getElementById("search-ssn");
let checkOutSSN = document.getElementById("checkout-ssn");
let patientName = document.querySelector(".patient-name");
let patientRoom = document.querySelector(".patient-room");
let patientArrDate = document.querySelector(".patient-arrDate");
let searchError = document.querySelector(".search-error");
let checkOutError = document.querySelector(".checkout-error");
let searchReasult = document.getElementById("result");

let myRequest = new XMLHttpRequest();

myRequest.open("GET", "../../mydata.json", true);
myRequest.send();

myRequest.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    if (JSON.parse(this.responseText).length != 0) {
      var patient = JSON.parse(this.responseText);
      searchSSN.addEventListener("input", function () {
        searchReasult.innerHTML = "";
        searchError.innerHTML = "";
        for (i = 0; i < patient.length; i++) {
          if (
            patient[i].name.includes(searchSSN.value) &&
            searchSSN.value != ""
          ) {
            console.log(searchSSN.value);
            console.log(patient[i].name);
            const result = document.createElement("div");
            result.id = `search-result`;
            result.className = `result ${i}`;
            result.innerHTML = patient[i].name;
            searchReasult.append(result);
            searchReasult.style.display = "block";
          }
        }
        document.addEventListener("click", function (e) {
          if (e.target.classList.contains("result")) {
            searchSSN.value = e.target.innerHTML;
            searchReasult.style.display = "none";
          }
        });
      });

      function patientcheck() {
        var found = false;
        for (var i = 0; !found && i < patient.length; i++) {
          if (searchSSN.value == patient[i].name) {
            found = true;
            console.log("found");
          }
        }
        if (found) {
          for (var l = 0; l < patient.length; l++) {
            if (searchSSN.value == patient[l].name) {
              patientCheckSearchHide.classList.add("rec-pach-search-hide");
              patientCheckResultShow.classList.add("rec-pach-result-show");
              patientName.innerHTML = patient[l].name;
              patientRoom.innerHTML = "Room" + " " + patient[l].room;
              patientArrDate.innerHTML = patient[l].arrDate;
              searchError.innerHTML = "";
            }
          }
        } else {
          searchError.innerHTML = "Patient Not Found";
        }
      }

      document.addEventListener("click", function (e) {
        if (e.target.classList.contains("rec-form-search-btn")) {
          if (patient.length === 0) {
            searchError.innerHTML = "Goooooo";
          } else if (searchSSN.value === "") {
            searchError.innerHTML = "Please Insert Patient Name";
          } else {
            searchError.innerHTML = "";
            patientcheck();
          }
        }
        if (e.target.classList.contains("rec-form-checkOut-btn")) {
          if (checkOutSSN.value === "") {
            checkOutError.innerHTML = "Please Insert SSN";
          } else if (checkOutSSN.value.length != 14) {
            checkOutError.innerHTML = "Incorrect SSN";
          } else {
            checkOutError.innerHTML = "";
          }
        }
      });
    } else {
      document.addEventListener("click", function (e) {
        if (e.target.classList.contains("rec-form-search-btn")) {
          searchError.innerHTML = "our Patients are totally cured";
        }
      });
    }
  }
};
// let visitorAdded = document.querySelector(".visitor-added")
// document.addEventListener("click", function (e) {
//   if (e.target.classList.contains("rec-form-save-btn")) {
//     if (document.getElementById("vfname").value == '') {
//       visitorAdded.innerHTML = "Please insert First Name"
//     }
//     else if (document.getElementById("vlname").value == '') {
//       visitorAdded.innerHTML = "Please insert Last Name"
//     }
//     else if (document.getElementById("vSSN").value == '') {
//       visitorAdded.innerHTML = "Please insert SSN"
//     }
//     else if (document.getElementById("vPhone").value == '') {
//       visitorAdded.innerHTML = "Please insert Phone Number"
//     }
//     else if (document.getElementById("vRN").value == '') {
//       visitorAdded.innerHTML = "Please insert Room Number"
//     } else {
//       visitorAdded.innerHTML = "Patient Added Sucessfully"
//       document.getElementById("vfname").value = ''
//       document.getElementById("vlname").value = ''
//       document.getElementById("vSSN").value = ''
//       document.getElementById("vPhone").value = ''
//       document.getElementById("vRN").value = ''
//     }
//   }
// })

window.onscroll = function () {
  if (patientCardHide.classList.contains("scroll")) {
    if (this.scrollY > 700) {
      patientCardHide.classList.add("rec-pa-card-hide");
    } else {
      patientCardHide.classList.remove("rec-pa-card-hide");
    }
  }
  if (visitorCardShow.classList.contains("scroll")) {
    if (this.scrollY > 700) {
      visitorCardShow.classList.add("rec-vi-card-show");
    } else {
      visitorCardShow.classList.remove("rec-vi-card-show");
    }
  }
};

let companion = document.getElementById("companion");
let companionBtn = document.querySelector(".rec-form-btn-change");
let companionData = document.querySelector(".companion-data");

companion.addEventListener("change", function () {
  if (this.checked) {
    console.log("Checkbox is checked..");
    companionData.style.display = "block";
  } else {
    console.log("Checkbox is not checked..");
    companionData.style.display = "none";
  }
});

let checkRoom = document.getElementById("departments");
let roomError = document.querySelector(".room-error");
let checkRooms = new XMLHttpRequest();

checkRooms.open("GET", "../../availableRooms.json", true);
checkRooms.send();

checkRooms.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    if (this.responseText != "") {
      var Rooms = JSON.parse(this.responseText);
      checkRoom.addEventListener("change", function () {
        var rooms = 0;
        for (i = 0; i < Rooms.length; i++) {
          if (checkRoom.value === Rooms[i].departement) {
            rooms += 1;
          }
        }
        if (rooms === 0) {
          roomError.innerHTML = "No Room Avaliable";
        } else if (rooms === 1) {
          roomError.innerHTML = rooms + " Room Avaliable";
        } else {
          roomError.innerHTML = rooms + " Rooms Avaliable";
        }
      });
    }
  }
};

function showPassword() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
} 