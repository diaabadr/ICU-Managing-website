let paName = document.querySelector(".pa-name")
let paAge = document.querySelector(".pa-report-age")
let paRoom = document.querySelector(".pa-report-room")
let docMessage = document.querySelector(".nurse-message");
let messageIcon = document.querySelector(".message-icon");
let doctorPatients = new XMLHttpRequest();
window.addEventListener("load", function (e) {
    let patientsList = document.querySelector(".contains")
    doctorPatients.open("GET", "../../nursePatients.json", true);
    doctorPatients.send();
    
    doctorPatients.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText != "") {
                var patients = JSON.parse(this.responseText);
                for (i = 0; i < patients.length; i++) {
                    let patient = document.createElement('div')
                    if (patients[i].docMessage != "") {
                        let icon = document.createElement("i");
                        let messageNum = document.createElement("h3");
                        messageNum.innerHTML = patients[i].docMessage.length
                        icon.className = "fa-solid fa-message";
                        let messageDiv = document.createElement('div')
                        messageDiv.className = "message-icon";
                        messageDiv.append(messageNum);
                        messageDiv.append(icon);
                        patient.append(messageDiv);
                    }
                    patient.setAttribute(`data-pNum`, i)
                    patient.className = "patient patient-button row"
                    let name = document.createElement('div')
                    name.className = "name col-4 prevent-click"
                    let nameH3 = document.createElement('h3')
                    nameH3.innerHTML = "Name"
                    nameH3.classList.add("prevent-click")
                    let nameH2 = document.createElement('h2')
                    nameH2.innerHTML = patients[i].name
                    nameH2.classList.add("prevent-click")
                    name.append(nameH3)
                    name.append(nameH2)
                    let age = document.createElement('div')
                    age.className = "age col-4 prevent-click"
                    let ageH3 = document.createElement('h3')
                    ageH3.innerHTML = "Age"
                    ageH3.classList.add("prevent-click")
                    let ageH2 = document.createElement('h2')
                    ageH2.innerHTML = patients[i].age
                    ageH2.classList.add("prevent-click")
                    age.append(ageH3)
                    age.append(ageH2)
                    let prog = document.createElement('div')
                    prog.className = "progress col-4 prevent-click"
                    let progH3 = document.createElement('h3')
                    progH3.innerHTML = "Room"
                    progH3.classList.add("prevent-click")
                    let progH2 = document.createElement('h2')
                    progH2.innerHTML = patients[i].room
                    progH2.classList.add("prevent-click")
                    prog.append(progH3)
                    prog.append(progH2)
                    patient.append(name)
                    patient.append(age)
                    patient.append(prog)
                    patientsList.append(patient)
                }
                let patiensHide = document.querySelector(".contains")
                let reportShow = document.querySelector(".report")
            
                document.addEventListener("click", function (e) {
                    if (e.target.classList.contains("patient-button")) {
                        patiensHide.classList.add("contains-hide")
                        reportShow.classList.add("report-show")
                        for (l = 0; l < patients.length; l++) {
                            if (e.target.querySelector(".name h2").innerHTML === patients[l].name) {
                                document.querySelector(".report-pa-ssn").value = patients[l].ssn
                                paName.innerHTML = patients[l].name
                                paAge.innerHTML = patients[l].age
                                paRoom.innerHTML = patients[l].room
                                let doctorMessage = document.createElement('div')
                                doctorMessage.className = "docMessage";
                                document.querySelector(".nurse-message").append(doctorMessage)
                                if (patients[l].docMessage != "") {
                                    docMessage.style.display = "block"
                                    for (i = 0; i < patients[l].docMessage.length; i++){
                                        let messageP = document.createElement('p')
                                        messageP.className = "report-data repP";
                                        messageP.innerHTML = patients[l].docMessage[i]
                                        document.querySelector(".docMessage").append(messageP)
                                    }
                                    docMessage.classList.remove("nurse-message-hide")
                                    if (patients[l].docMessage.length === 1) {
                                    document.querySelector(".nurse-message .sp-header").innerHTML = "Nurse Message"
                                } else {
                                    document.querySelector(".nurse-message .sp-header").innerHTML = "Nurse Messages"
                                }
                                }
                            }
                        }
                    }
                    if (e.target.classList.contains("report-back")) {
                    const myTimeout = setTimeout(hideMessage, 500);
                    patiensHide.classList.remove("contains-hide")
                    reportShow.classList.remove("report-show")
                    let removeM = setTimeout(removeMessage,500)
                }
                })
            } else {
                let noPatients = document.createElement('div')
                noPatients.className = "no-patients"
                patientsList.append(noPatients);
                noPatients.innerHTML = "You Have No Patients"
                document.querySelector(".patients").style.overflow = "hidden"
            }
        }
    }
})
function hideMessage() {
    docMessage.style.display = "none";
}
function removeMessage() {
    let repP = document.querySelector(".docMessage").remove();
}
