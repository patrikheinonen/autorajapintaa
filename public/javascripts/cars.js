function searchCar() {
    var name = document.getElementById("car");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            if (json.length> 0){ // something found
                console.table(json);
                showList(json);
            }
            else {
                document.getElementById("locationInfo").innerHTML = "<br/>Ei tapahtumatietoja tältä ajalta.";
            }
        }
    };
    xmlhttp.open("GET", "http://localhost:8081/cars?name="+ name, true);
    xmlhttp.send();
}


function showList(json) {
    var locationInfo = document.getElementById("locationInfo");
    locationInfo.innerHTML =
        "<table>" +
        "<tr>" +
        "<th>Date</th>"
    "<th>Name</th>" +
    "</tr>" +
    "</table>";
    for(var i=0; i<json.length; i++) {
        var row = locationInfo.firstChild.insertRow(-1);
        row.insertCell(0).innerHTML = (json);

    }
}