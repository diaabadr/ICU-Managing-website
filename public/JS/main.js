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
let visitorFormShow = document.querySelector(".rec-vi-form");
let patientCheckFormShow = document.querySelector(".rec-pach-form");
let patientCheckSearchHide = document.querySelector(".rec-pach-search");
let patientCheckResultShow = document.querySelector(".rec-pach-result");

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
  }
  if (e.target.classList.contains("rec-pach-button-btn")) {
    patientCardHide.classList.add("rec-pa-card-hide");
    patientCheckFormShow.classList.add("rec-pach-form-show");
    patientCardHide.classList.remove("scroll");
  }
  if (e.target.classList.contains("rec-form-btn-close")) {
    patientCardHide.classList.remove("rec-pa-card-hide");
    patientFormShow.classList.remove("rec-pa-form-show");
    patientCheckFormShow.classList.remove("rec-pach-form-show");
    patientCardHide.classList.add("scroll");
    searchError.innerHTML = "";
    searchSSN.value = "";
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
let patientName = document.querySelector(".patient-name");
let patientRoom = document.querySelector(".patient-room");
let patientArrDate = document.querySelector(".patient-arrDate");
let searchError = document.querySelector(".search-error");

let myRequest = new XMLHttpRequest();

myRequest.open("GET", "../../mydata.json", true);
myRequest.send();

myRequest.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    var patient = JSON.parse(this.responseText);
    function patientcheck() {
      var found = false;
      for (var i = 0; !found && i < patient.length; i++) {
        if (searchSSN.value == patient[i].ssn) {
          found = true;
        }
      }
      if (found) {
        for (var l = 0; l < patient.length; l++) {
          if (searchSSN.value == patient[l].ssn) {
            patientCheckSearchHide.classList.add("rec-pach-search-hide");
            patientCheckResultShow.classList.add("rec-pach-result-show");
            patientName.innerHTML = patient[l].name;
            patientRoom.innerHTML = patient[l].room;
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
        if (searchSSN.value === "") {
          searchError.innerHTML = "Please Insert SSN";
        } else if (searchSSN.value.length < 6) {
          searchError.innerHTML = "Incorrect SSN";
        } else {
          searchError.innerHTML = "";
          patientcheck();
        }
      }
    });
  }
};

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
