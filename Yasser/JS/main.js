let nurse = document.querySelector(".home-body .img .image")
let homeCard = document.querySelector(".home-body .card")
let loginPage = document.querySelector(".login-page")
let visitorPage = document.querySelector(".visitor-page")

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("logo")) {
        window.open("../index.html", "_self")
    }
    if (e.target.classList.contains("back")) {
        nurse.classList.remove("image-transform")
        homeCard.classList.remove("card-transform")
        loginPage.classList.remove("login-page-show")
        visitorPage.classList.remove("visitor-page-show")
    }
    if (e.target.classList.contains("login")) {
        nurse.classList.add("image-transform")
        homeCard.classList.add("card-transform")
        loginPage.classList.add("login-page-show")
    }
    if (e.target.classList.contains("visitor")) {
        nurse.classList.add("image-transform")
        homeCard.classList.add("card-transform")
        visitorPage.classList.add("visitor-page-show")
    }
})