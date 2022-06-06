let sideBar = document.querySelector(".sidebar")
let sidebarText = document.getElementsByClassName("ele-text")
let sidebarEle = document.getElementsByClassName("sidebar-ele")
let insight = document.getElementsByClassName("insight")
let staff =document.getElementsByClassName("staff")
let staffMem = document.getElementsByClassName("staff-members")
let col8 = document.querySelector(".col-8")
let insights = document.querySelector(".insights")
let complaintsContainer= document.querySelector(".complaints-container");
let patients = document.querySelector(".messages");
let pageContains = document.getElementsByClassName("page-contains");
let staffPosition = document.querySelector(".staff-position")
let staffDep = document.querySelector(".staff-dep")
let avaDoctor = document.getElementsByClassName("ava-doctor")
let avaNurse = document.getElementsByClassName("ava-nurse")
let assignedDoc = document.getElementsByClassName("assigned-doc");
let assignedNurse = document.getElementsByClassName("assigned-nurse");
let assignedPat = document.getElementsByClassName("assigned-pat");
let assignButton = document.getElementsByClassName("assign-btn");
let Errors = document.getElementsByClassName("error");
let assignForm = document.querySelector(".assign-form");
var z = 5

document.addEventListener("click", function (e) {
    if (e.target.classList.contains('sidebar')) {
        if (sideBar.classList.contains("sidebar-show")) {
            sideBar.classList.remove("sidebar-show")
            for (i = 0; i < sidebarText.length; i++) {
                sidebarText[i].classList.remove("ele-text-show");
            }
            setTimeout(hide,200)
        } else {
            sideBar.classList.add("sidebar-show")
            
            setTimeout(showDiv,350)
            setTimeout(show,500)
        }
    }
    if (e.target.classList.contains("sidebar-ele")) {
        for (i = 0; i < sidebarEle.length; i++){
            if (sidebarEle[i].classList.contains("active")) {
                sidebarEle[i].classList.remove("active");
            }
        }
        let adminPage = document.getElementsByClassName(`${e.target.getAttribute("data-sidebarEle")}`)
        e.target.classList.add("active")
        for (i = 0; i < pageContains.length; i++){
            pageContains[i].classList.remove("page-show");
            setTimeout(hideDiv, 300, pageContains[i]);
        }
        setTimeout(showDiv2, 300, adminPage[0]);
        setTimeout(pageRotate, 400, adminPage[0]);
    }
    if (e.target.getAttribute("data-ins") != "") {
            if (e.target.classList.contains("insight")) {
            let pat = document.getElementsByClassName(`${e.target.getAttribute("data-ins")}`);
            let dash = document.querySelector(".dashboard")
            dash.classList.remove("show");
            const myTimeout = setTimeout(hideDiv, 500, dash);
            pat[0].style.display = "block";
            const myTimeoutShow = setTimeout(showInsight, 500,pat[0]);
                document.addEventListener("click", function (e) {
                    if (e.target.classList.contains("admin-back")) {
                        pat[0].classList.remove("show")
                        setTimeout(hideDiv, 500, pat[0])
                        setTimeout(showDiv2, 500, dash)
                        setTimeout(showInsight, 600, dash);
                    }
                })
        }
    }
    if (e.target.classList.contains("staff")) {
        for (i = 0; i < staff.length; i++) {
            staff[i].classList.remove("active-staff")
        }
        e.target.classList.add("active-staff")
        let staffMembers = document.getElementsByClassName(`${e.target.getAttribute("data-staff")}`)
        for (i = 0; i < staffMem.length; i++){
            staffMem[i].classList.remove("active-staff-card");
        }
        staffMembers[0].classList.add("active-staff-card");
    }

    if (e.target.classList.contains("complaints")) {
        col8.classList.add("col-8-hide")
        insights.classList.add("insights-hide");
        setTimeout(hideDiv, 300, col8)
        setTimeout(hideDiv, 1100, insights)
        setTimeout(compWidth, 300)
        setTimeout(compHeight, 1200)
    }
    if (e.target.classList.contains("comp-back")) {
        
        setTimeout(finish, 600, col8);
        setTimeout(showDiv2, 450, col8);
        setTimeout(showDiv2, 450, insights);
        setTimeout(compAntiWidth, 300)
        setTimeout(compAntiHeight, 300)
    }
    if (e.target.classList.contains("ava-doctor")) {
        if (e.target.classList.contains("assigned")) {
            e.target.classList.remove("assigned");
            assignedDoc[e.target.getAttribute("data-pa")-1].value = "";
        } else {
        for (i = 0; i < avaDoctor.length; i++) {
            avaDoctor[i].classList.remove("assigned");
        }
        e.target.classList.add("assigned");
        console.log(e.target.getAttribute("data-pa"))
        assignedDoc.value = document.querySelector(`.assigned .name h2`).innerHTML;
            assignedDoc[e.target.getAttribute("data-pa") - 1].value = e.target.querySelector(`.name h2`).innerHTML;
            assignedPat[e.target.getAttribute("data-pa") - 1].value = document.querySelector(`.one-pat .pa-${e.target.getAttribute("data-pa")} .name h2`).innerHTML;
        }
    }
    if (e.target.classList.contains("ava-nurse")) {
        if (e.target.classList.contains("assigned")) {
            e.target.classList.remove("assigned");
            assignedNurse[e.target.getAttribute("data-pa") - 1].value = "";
        } else {
            for (i = 0; i < avaNurse.length; i++) {
                avaNurse[i].classList.remove("assigned");
            }
            e.target.classList.add("assigned");
            assignedNurse[e.target.getAttribute("data-pa") - 1].value = e.target.querySelector(`.name h2`).innerHTML;
            assignedPat[e.target.getAttribute("data-pa") - 1].value = document.querySelector(`.one-pat .pa-${e.target.getAttribute("data-pa")} .name h2`).innerHTML;
            console.log(`${e.target.getAttribute("data-pa")}`);
            z = `${e.target.getAttribute("data-pa")}`;
        }
    }
})
document.addEventListener("click", function (x) {
    if (x.target.classList.contains("assign-btn")) {
        console.log(x.target.getAttribute("data-btn"));
        if ((assignedDoc[x.target.getAttribute("data-btn") - 1].value === "") && (assignedNurse[x.target.getAttribute("data-btn") - 1].value === "")) {
            Errors[x.target.getAttribute("data-btn") - 1].innerHTML = "Please Assign Staff !";
    } else if ((assignedDoc[x.target.getAttribute("data-btn") - 1].value === "")) {
            Errors[x.target.getAttribute("data-btn") - 1].innerHTML = "Please Assign Doctor !";
        }
        else if ((assignedNurse[x.target.getAttribute("data-btn") - 1].value === "")) {
            Errors[x.target.getAttribute("data-btn") - 1].innerHTML = "Please Assign Nurse !";
        }
    }
})
document.addEventListener("change", function (e) {
    if (e.target.classList.contains("staff-position")) {
        if (staffPosition.value != "Receptionist") {
            staffDep.style.display = "block"
        } else {
            staffDep.style.display = "none"
        }
    }
})

function show() {
    for (i = 0; i < sidebarText.length; i++) {
        sidebarText[i].classList.add("ele-text-show");
    }
}
function showDiv() {
    for (i = 0; i < sidebarText.length; i++) {
        sidebarText[i].style.display = "block";
    }
}
function hide() {
    for (i = 0; i < sidebarText.length; i++) {
        sidebarText[i].style.display = "none";
    }
}

function hideDiv(x) {
    x.style.display = "none"
}
function showDiv2(x) {
    x.style.display = "block"
}

function showInsight(x) {
    x.classList.add("show");
}
function compWidth() {
    complaintsContainer.classList.add("complaints-width");
}
function compHeight() {
    patients.classList.add("complaints-height");
}
function compAntiWidth() {
    complaintsContainer.classList.remove("complaints-width");
}
function compAntiHeight() {
    patients.classList.remove("complaints-height");
}
function finish(){
    col8.classList.remove("col-8-hide")
    insights.classList.remove("insights-hide");
}

function pageRotate(x) {
    x.classList.add("page-show");
}