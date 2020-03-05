function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


function searchCar() {
    var name = document.getElementById("car").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                console.log("1")
                var json = JSON.parse(xmlhttp.responseText);

                if (json.length > 0) { // something found
                    showList(json);
                    console.log("2")
                } else {
                    console.log("3")
                }
            } catch {
                console.log("4")
                document.getElementById("row").innerHTML = "Haulla ei löytynyt mitään"
            }
        }
    };
    console.log("111")
    xmlhttp.open("GET", "http://localhost:8082/cars?name=" + name, true);
    xmlhttp.send();
}

function deleteButton(number){
    var id = number;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                console.log("5")
                var json = JSON.parse(xmlhttp.responseText);
                searchCar();
                document.getElementById("locationInfo").firstChild.deleteRow(-1);
                if (json.length > 0) { // something found
                    console.log("8")
                } else {
                    console.log("9")
                }
            } catch {
                console.log("10")
                document.getElementById("row").innerHTML = "Haulla ei löytynyt mitään";
            }
        }
    };
    console.log(id);
    xmlhttp.open("DELETE", "http://localhost:8082/cars?id="+id, true);
    xmlhttp.send();

}

function showList(json) {
    var locationInfo = document.getElementById("locationInfo");

    locationInfo.innerHTML =
        "<table>" +
        "<tr>" +
        "<th>ID</th>" +
        "<th>Merkki</th>" +
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
        "<th>Poista </th>" +
        "</tr>" +
        "</table>";

    for (var i = 0; i < json.length; i++) {
        var row = locationInfo.firstChild.insertRow(-1);
        var id = json[i].AutoId;
        row.insertCell(0).innerHTML = (id);
        row.insertCell(1).innerHTML = (json[i].Merkki);
        row.insertCell(2).innerHTML = (json[i].Malli);
        row.insertCell(3).innerHTML = (json[i].Valmistusvuosi);
        row.insertCell(4).innerHTML = (json[i].Polttoaine);
        row.insertCell(5).innerHTML = (json[i].Paino);
        row.insertCell(6).innerHTML = (json[i].CO2);
        row.insertCell(7).innerHTML = (json[i].Hinta);
        row.insertCell(8).innerHTML = (json[i].MaxNopeus);
        row.insertCell(9).innerHTML = (json[i].NollastaSataan);
        row.insertCell(10).innerHTML = (json[i].HevosVoimat);
        row.insertCell(11).innerHTML = (json[i].VetävätRenkaat);
        row.insertCell(12).innerHTML = `<button type='button' onclick='deleteButton(${id})' name='deletebtn'>Poista</button>`
    }
    console.log("222")

}