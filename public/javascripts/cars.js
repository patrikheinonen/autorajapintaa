
function searchCar() {
    var name = document.getElementById("car").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var json = JSON.parse(xmlhttp.responseText);
                console.log(json)
                if (json.length > 0) { // something found
                    console.table(json);
                    showList(json);
                } else {
                    console.log(json)
                }
            } catch {

                document.getElementById("row").innerHTML = "Haulla ei löytynyt mitään"

            }


        }
    };
    console.log(name);
    xmlhttp.open("GET", "http://localhost:8082/cars?name=" + name, true);
    xmlhttp.send();
}

function addFunctionalityToButtons() {
    var buttons = document.getElementsByName("deletebtn");

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            var id = this.parentElement.parentElement.firstChild.innerHTML;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    try {
                        var json = JSON.parse(xmlhttp.responseText);
                        console.log(json);
                        searchCar();
                        if (json.length > 0) { // something found
                            console.table(json);
                        } else {
                            console.log(json);
                        }
                    } catch {
                        document.getElementById("row").innerHTML = "Haulla ei löytynyt mitään";
                    }
                }
            };
            xmlhttp.open("DELETE", "http://localhost:8082/cars?id="+id, true);
            xmlhttp.send();
        }
    }

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
        row.insertCell(0).innerHTML = (json[i].AutoId);
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
        row.insertCell(12).innerHTML = "<button type='button' name='deletebtn'>Poista</button>";
    }

    addFunctionalityToButtons();


}