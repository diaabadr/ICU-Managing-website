let myRequest = new XMLHttpRequest();

myRequest.open("GET", "../mydata.json", true);
myRequest.send();

myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        console.log(this.responseText)    
    }
}