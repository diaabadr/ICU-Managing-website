let nurse = document.querySelector(".home-body .img .image");
let homeCard = document.querySelector(".home-body .card");
let loginPage = document.querySelector(".login-page");
let visitorPage = document.querySelector(".visitor-page");
let showVisitor = document.querySelector(".show-visitor");
let showLogin = document.querySelector(".show-login");
let visitorCardShow = document.querySelector(".rec-vi-card")
let patientCardHide = document.querySelector(".rec-pa-card")
let recVisitor = document.querySelector(".receptionist-visitor-card")
let patientFormShow = document.querySelector(".rec-pa-form")
let visitorFormShow = document.querySelector(".rec-vi-form")
let patientCheckFormShow = document.querySelector(".rec-pach-form")
let patientCheckSearchHide = document.querySelector(".rec-pach-search")
let patientCheckResultShow = document.querySelector(".rec-pach-result")

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("home-btn")) {
    location.assign("/");
  }
  if (e.target.classList.contains("login-back")) {
    location.assign("/")
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
    patientCardHide.classList.add("rec-pa-card-hide")
    patientFormShow.classList.add("rec-pa-form-show")
    patientCardHide.classList.remove("scroll")
  }
  if (e.target.classList.contains("rec-vi-button-btn")) {
    visitorFormShow.classList.add("rec-vi-form-show")
    visitorCardShow.classList.remove("scroll")
    visitorCardShow.classList.remove("rec-vi-card-show")
  }
  if (e.target.classList.contains("rec-visitor-form-btn-close")) {
    visitorFormShow.classList.remove("rec-vi-form-show")
    visitorCardShow.classList.add("scroll")
    visitorCardShow.classList.add("rec-vi-card-show")
  }
  if (e.target.classList.contains("rec-pach-button-btn")) {
    patientCardHide.classList.add("rec-pa-card-hide")
    patientCheckFormShow.classList.add("rec-pach-form-show")
    patientCardHide.classList.remove("scroll")
  }
  if (e.target.classList.contains("rec-form-btn-close")) {
    patientCardHide.classList.remove("rec-pa-card-hide")
    patientFormShow.classList.remove("rec-pa-form-show")
    patientCheckFormShow.classList.remove("rec-pach-form-show")
    patientCardHide.classList.add("scroll")
  }
  if (e.target.classList.contains("rec-form-search-btn")) {
    patientCheckSearchHide.classList.add("rec-pach-search-hide")
    patientCheckResultShow.classList.add("rec-pach-result-show")
  }
  if (e.target.classList.contains("rec-form-result-btn-close")) {
    patientCheckSearchHide.classList.remove("rec-pach-search-hide")
    patientCheckResultShow.classList.remove("rec-pach-result-show")
  }
  if (e.target.classList.contains("rec-form-result-btn-back")) {
    patientCheckSearchHide.classList.remove("rec-pach-search-hide")
    patientCheckResultShow.classList.remove("rec-pach-result-show")
  }
});

window.onscroll = function() {
  if (patientCardHide.classList.contains("scroll")) {
    console.log("Goooo")
    if (this.scrollY > 700) {
      patientCardHide.classList.add("rec-pa-card-hide")
    } else {
      patientCardHide.classList.remove("rec-pa-card-hide")
    }
    }
    if (visitorCardShow.classList.contains("scroll")) {
      if (this.scrollY > 700) {
        visitorCardShow.classList.add("rec-vi-card-show")
      } else {
        visitorCardShow.classList.remove("rec-vi-card-show")
      }
      }
}
