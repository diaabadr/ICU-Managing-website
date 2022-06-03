let paName = document.querySelector(".pa-name")
let paAge = document.querySelector(".pa-report-age")
let paRoom = document.querySelector(".pa-report-room")
let paProgRatio = document.querySelector(".prog-ratio")
let paProgRatioText = document.querySelector(".prog-ratio-text")
let nurseMessage = document.querySelector(".nurse-message")
let messageIcon = document.querySelector(".message-icon");
let docMessage = document.querySelector(".nurse-message");


let doctorPatients = new XMLHttpRequest();
window.addEventListener("load", function (e) {
    let patientsList = document.querySelector(".contains")
    doctorPatients.open("GET", "../../doctorPatients.json", true);
    doctorPatients.send();
    
    doctorPatients.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText != "") {
                var patients = JSON.parse(this.responseText);
                for (i = 0; i < patients.length; i++) {
                    let patient = document.createElement('div')
                    if (patients[i].nuresMessage != "") {
                        let icon = document.createElement("i");
                        let messageNum = document.createElement("h3");
                        messageNum.innerHTML = patients[i].nuresMessage.length;
                        icon.className = "fa-solid fa-message";
                        let messageDiv = document.createElement("div");
                        messageDiv.className = "message-icon";
                        messageDiv.append(messageNum);
                        messageDiv.append(icon);
                        patient.append(messageDiv);
                    }
                    if (
                        patients[i].bloodType === "" ||
                        patients[i].Medicines === "" ||
                        patients[i].ID === "" 
                    ) {
                        let icon = document.createElement("i");
                        icon.className = "complele-icon fa-solid fa-clipboard-list";
                        patient.append(icon);
                    } 
                    patient.setAttribute(`data-pNum`, i )
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
                            progH3.innerHTML = "Progress"
                            progH3.classList.add("prevent-click")
                            let progH2 = document.createElement('h2')
                            progH2.innerHTML = patients[i].prog
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
                            if (patients[l].bloodType != "") {
                                document.querySelector("#blood-type").value = patients[l].bloodType;
                                document.querySelector("#blood-type").setAttribute("disabled",true)
                                document.querySelector("#blood-type").setAttribute("readonly","readonly")
                            }
                            if (patients[l].ID != "") {
                                document.querySelector("#ID").value = patients[l].ID;
                                document.querySelector("#ID").setAttribute("disabled",true)
                                document.querySelector("#ID").setAttribute("readonly","readonly")
                            }
                            if (patients[l].Medicines != "") {
                                document.querySelector("#medicines").value = patients[l].Medicines;
                                document.querySelector("#ID").setAttribute("disabled",true)
                                document.querySelector("#medicines").setAttribute("readonly","readonly")
                                document.querySelector("#medicines").setAttribute("disabled",true)
                                document.querySelector("#medicines").setAttribute("title","Double Click to Edit")
                            }
                            document.addEventListener("dblclick", function (e) { 
                                if (e.target.classList.contains("medicines")) {
                                    document.querySelector("#ID").removeAttribute("disabled",true)
                                    document.querySelector("#medicines").removeAttribute("title","Double Click to Edit")
                                    document.querySelector("#medicines").removeAttribute("readonly")
                                    document.querySelector("#medicines").removeAttribute("disabled",true)
                                }
                            })

                            paName.innerHTML = patients[l].name
                            paAge.innerHTML = patients[l].age
                            paRoom.innerHTML = patients[l].room
                            paProgRatio.style.width = patients[l].prog
                            paProgRatioText.innerHTML = patients[l].prog
                            let doctorMessage = document.createElement("div");
                            doctorMessage.className = "docMessage";
                            document.querySelector(".nurse-message").append(doctorMessage)
                            var bp = []
                            var bs = []
                            for (j = 0; j < patients[l].bp.length; j++) {
                                var dataBP = new google.visualization.DataTable();
                                var dataPG = new google.visualization.DataTable();
                                bp.push(["Day " + (j+1), patients[l].bp[j]])
                                bs.push(["Day " + (j+1), patients[l].bs[j]])
                            }                            
                            dataBP.addColumn('string', 'sitecode');
                            dataBP.addColumn('number', 'Blood Presure');
                            dataBP.addRows(bp)
                            
                            var options = {
                                colors: ['#00aeef'],
                                legend: { position: "none" },
                                titleTextStyle: {
                                color: '#FFF'
                                },
                                    hAxis: {
                                        titleTextStyle: {
                                            color: '#FFF',
                                            fontSize: 18,
                                            fontName: 'Roboto',
                                            italic: false,
                                            bold: true,
                                        },
                                    gridlines: {
                                        color: "transparent"
                                    },
                                    baselineColor: '#FFF',
                                    title: 'Days',
                                        textStyle: {
                                            color: '#FFF',
                                            fontSize: 14,
                                            fontName: 'Roboto',
                                            italic: false,
                                        },
                            },
                                vAxis: {
                                    title: 'Systolic Blood Pressure',
                                    titleTextStyle: {
                                        color: '#FFF',
                                        fontSize: 18,
                                        fontName: 'Roboto',
                                        italic: false,
                                        bold: true,
                                    },
                                    textStyle: {
                                        color: '#FFF',
                                        fontName: 'Roboto',
                                        italic: false,
                                        fontSize: 14
                                    },
                                    baseline: { color: '#FFF' },
                                },
                                width: '90%',
                                height: 500,
                                backgroundColor: '#222468',
                                is3D: false
                                };
                            
                                var chart = new google.visualization.ColumnChart(
                                document.getElementById('bp'));
                            
                                chart.draw(dataBP, options);
                            dataPG.addColumn('string', 'sitecode');
                            dataPG.addColumn('number', 'Blood Glucose');
                            dataPG.addRows(bs)
                            
                            var options = {
                                colors: ['#00aeef'],
                                legend: { position: "none" },
                                titleTextStyle: {
                                color: '#FFF'
                                },
                                    hAxis: {
                                        titleTextStyle: {
                                            color: '#FFF',
                                            fontSize: 18,
                                            fontName: 'Roboto',
                                            italic: false,
                                            bold: true,
                                        },
                                    gridlines: {
                                        color: "transparent"
                                    },
                                    baselineColor: '#FFF',
                                    title: 'Days',
                                        textStyle: {
                                            color: '#FFF',
                                            fontSize: 14,
                                            fontName: 'Roboto',
                                            italic: false,
                                        },
                            },
                                vAxis: {
                                    title: 'Blood Glucose',
                                    titleTextStyle: {
                                        color: '#FFF',
                                        fontSize: 18,
                                        fontName: 'Roboto',
                                        italic: false,
                                        bold: true,
                                    },
                                    textStyle: {
                                        color: '#FFF',
                                        fontName: 'Roboto',
                                        italic: false,
                                        fontSize: 14
                                    },
                                    baseline: { color: '#FFF' },
                                },
                                width: '90%',
                                height: 500,
                                backgroundColor: '#222468',
                                is3D: false
                                };
                            
                                var chart2 = new google.visualization.ColumnChart(
                                document.getElementById('bg'));
                            
                                chart2.draw(dataPG, options);
                            
                            
                            if (patients[l].nuresMessage != "") {
                                docMessage.style.display = "block"
                                for (i = 0; i < patients[l].nuresMessage.length; i++) {
                                    let messageP = document.createElement('p')
                                    messageP.className = "report-data repP";
                                    messageP.innerHTML = patients[l].nuresMessage[i]
                                    document.querySelector(".docMessage").append(messageP)
                                }
                                if (patients[l].nuresMessage.length === 1) {
                                    document.querySelector(".nurse-message .sp-header").innerHTML = "Nurse Message"
                                } else {
                                    document.querySelector(".nurse-message .sp-header").innerHTML = "Nurse Messages"
                                }
                            }
                            
                        }
                    }
                }
                
                if (e.target.classList.contains("report-back")) {
                    patiensHide.classList.remove("contains-hide")
                    reportShow.classList.remove("report-show")
                    const myTimeout = setTimeout(hideMessage, 500);
                    document.querySelector("#blood-type").value = "Select Blood Type";
                    document.querySelector("#blood-type").removeAttribute("disabled",true)
                    document.querySelector("#blood-type").removeAttribute("readonly","readonly")
                    document.querySelector("#ID").value = "";
                    document.querySelector("#ID").removeAttribute("disabled",true)
                    document.querySelector("#ID").removeAttribute("readonly","readonly")
                    document.querySelector("#medicines").value = "";
                    document.querySelector("#ID").removeAttribute("disabled",true)
                    document.querySelector("#medicines").removeAttribute("readonly","readonly")
                    document.querySelector("#medicines").removeAttribute("title", "Double Click to Edit")
                    document.querySelector("#medicines").removeAttribute("disabled",true)
                    let removeM = setTimeout(removeMessage, 500);
                }
            })
        }
    }
}
})

function hideMessage() {
    nurseMessage.style.display = "none"
}

function removeMessage() {
  let repP = document.querySelector(".docMessage").remove();
}

