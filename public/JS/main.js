let nurse = document.querySelector(".home-body .img .image");
let homeCard = document.querySelector(".home-body .card");
let loginPage = document.querySelector(".login-page");
let visitorPage = document.querySelector(".visitor-page");
let showVisitor = document.querySelector(".show-visitor");
let showLogin = document.querySelector(".show-login");
let visitorCardShow = document.querySelector(".rec-vi-card")
let patientCardHide = document.querySelector(".rec-pa-card")
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
});

window.onscroll = function() {
  if (this.scrollY > 700) {
    visitorCardShow.classList.add("rec-vi-card-show")
    patientCardHide.classList.add("rec-pa-card-hide")
  } else {
    visitorCardShow.classList.remove("rec-vi-card-show")
    patientCardHide.classList.remove("rec-pa-card-hide")
  }
}
