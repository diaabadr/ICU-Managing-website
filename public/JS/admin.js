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
console.log(patients);

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
        e.target.classList.add("active")
    }
    if (e.target.getAttribute("data-ins") != "") {
            if (e.target.classList.contains("insight")) {
            console.log(e.target.getAttribute("data-ins"));
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
        console.log(`${e.target.getAttribute("data-staff")}`);
        let staffMembers = document.getElementsByClassName(`${e.target.getAttribute("data-staff")}`)
        for (i = 0; i < staffMem.length; i++){
            staffMem[i].classList.remove("active-staff-card");
        }
        staffMembers[0].classList.add("active-staff-card");
        console.log(staffMembers[0]);
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