function searchCar() {
    var name = document.getElementById("car").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var json = JSON.parse(xmlhttp.responseText);
                if (json.length> 0){ // something found
                    console.table(json);
                    showList(json);
                }
                else {
                    console.log(json)
                }
            } catch {
                document.getElementById("row").innerHTML = "Haulla ei löytynyt mitään"

            }


        }
    };
    console.log(name);
    xmlhttp.open("GET", "http://localhost:8082/cars?name="+ name, true);
    xmlhttp.send();
}


function showList(json) {
    var locationInfo = document.getElementById("locationInfo");
    locationInfo.innerHTML =
        "<table>" +
        "<tr>" +
        "<th>Merkki</th>"+
        "<th>Malli</th>" +
        "<th>Valmistusvuosi</th>" +
        "<th>Polttoaine</th>" +
        "<th>Paino</th>" +
        "<th>CO2</th>" +
        "<th>Hinta</th>" +
        "<th>Maksiminopeus</th>" +
        "<th>Nollasta sataan</th>" +
        "<th>Hevosvoimat</th>" +
        "<th>Vetävätrenkaat</th>" +
        "</tr>" +
        "</table>";
    for(var i=0; i<json.length; i++) {
        var row = locationInfo.firstChild.insertRow(-1);
        row.insertCell(0).innerHTML = (json[i].Merkki);
        row.insertCell(1).innerHTML = (json[i].Malli);
        row.insertCell(2).innerHTML = (json[i].Valmistusvuosi);
        row.insertCell(3).innerHTML = (json[i].Polttoaine);
        row.insertCell(4).innerHTML = (json[i].Paino);
        row.insertCell(5).innerHTML = (json[i].CO2);
        row.insertCell(6).innerHTML = (json[i].Hinta);
        row.insertCell(7).innerHTML = (json[i].MaxNopeus);
        row.insertCell(8).innerHTML = (json[i].NollastaSataan);
        row.insertCell(9).innerHTML = (json[i].HevosVoimat);
        row.insertCell(10).innerHTML = (json[i].VetävätRenkaat);
    }
}