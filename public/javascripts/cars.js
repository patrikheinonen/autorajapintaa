window.onload = function () {
    var close = document.getElementsByClassName("close")[0];
    var closeImage = document.getElementById("closeImage")
    close.onclick = function () {
        var insertDiv = document.getElementById("insert");
        insertDiv.style.display = "none";
    }

    closeImage.onclick = function () {
        var div = document.getElementById("image");
        div.style.display = "none";
    }
};

function loadError() {
    alert("Sisältöä ei voitu ladata!");
}

function searchCar() {
    document.getElementById("row").innerHTML = "";
    var name = document.getElementById("car").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var json = JSON.parse(xmlhttp.responseText);

                if (json.length > 0) { // something found
                    showList(json);
                } else {
                }
            } catch {
                document.getElementById("row").innerHTML = "Haulla ei löytynyt mitään"
            }
        }
    };
    xmlhttp.open("GET", "http://localhost:8082/cars/" + name, true);
    xmlhttp.send();
}

function deleteButton(number) {
    if (confirm("Oletko varma, että haluat poistaa auton tunnuksella: " + number)) {
        var id = number;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                try {
                    var json = JSON.parse(xmlhttp.responseText);
                    searchCar();
                    document.getElementById("locationInfo").firstChild.deleteRow(-1);
                } catch {
                    document.getElementById("row").innerHTML = "Haulla ei löytynyt mitään";
                }
            }
        };
        xmlhttp.open("DELETE", "http://localhost:8082/cars/" + id, true);
        xmlhttp.send();
    }
}

function openInsertForm() {
    var insertDiv = document.getElementById("insert");
    insertDiv.style.display = "block";

}

function addCarToDb() {
    var mark = document.getElementById("Merkki").value;
    var model = document.getElementById("Malli").value;
    var year = document.getElementById("Valmistusvuosi").value;
    var fuel = document.getElementById("Polttoaine").value;
    var weight = document.getElementById("Paino").value;
    var co2 = document.getElementById("CO2").value;
    var price = document.getElementById("Hinta").value;
    var topSpeed = document.getElementById("Maksiminopeus").value;
    var from0to100 = document.getElementById("NollastaSataan").value;
    var horsePower = document.getElementById("Hevosvoimat").value;
    var wheels = document.getElementById("VetävätRenkaat").value;
    var img = document.getElementById("Kuva").value;

    var data = JSON.stringify(
        {
            mark: mark,
            model: model,
            year: Number(year),
            fuel: fuel,
            weight: Number(weight),
            co2: Number(co2),
            price: Number(price),
            topSpeed: Number(topSpeed),
            from0to100: Number(from0to100),
            horsePower: Number(horsePower),
            wheels: wheels,
            img: img
        });

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var json = JSON.parse(xmlhttp.responseText);
            } catch {
                document.getElementById("row").innerHTML = "Haulla ei löytynyt mitään";
            }
        }
    };
    xmlhttp.open("POST", "http://localhost:8082/cars", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(data);
    alert("Uusi auto lisätty onnistuneesti!");
    var insertDiv = document.getElementById("insert");
    insertDiv.style.display = "none";
    searchCar();
}

function modifyButton(number) {
    console.log(number)
    var modal = document.getElementById("myModal");

    var save = document.getElementById("saveBtn")

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    var content = document.getElementById("content");

    var table = document.getElementById("table");
    let rightRow;
    for (let i = 0, row; row = table.rows[i]; i++) {
        for (let j = 0, col; col = row.cells[j]; j++) {

            if (j === 0 && number == col.innerHTML) {
                rightRow = row;
                break;
            }
        }
    }
    for (let j = 1, col, title; col = rightRow.cells[j], title = table.rows[0].cells[j], j < rightRow.cells.length - 3; j++) {
        var y = document.createElement("p");
        y.innerHTML = title.innerHTML + ": ";
        var x = document.createElement("INPUT");
        x.setAttribute("type", "text");
        x.setAttribute("value", col.innerHTML);
        content.append(y);
        content.append(x);
    }
    var values = content.getElementsByTagName("input");
    values[2].setAttribute('type', 'number');
    values[4].setAttribute('type', 'number');
    values[5].setAttribute('type', 'number');
    values[6].setAttribute('type', 'number');
    values[7].setAttribute('type', 'number');
    values[8].setAttribute('type', 'number');
    values[9].setAttribute('type', 'number');
    values[11].setAttribute('type', 'url');
//
// When the user clicks on the button, open the modal
    modal.style.display = "block";

// When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        content.innerHTML = "";
    }

    save.onclick = function () {
        var data = JSON.stringify(
            {
                mark: values[0].value,
                model: values[1].value,
                year: values[2].value,
                fuel: values[3].value,
                weight: values[4].value,
                co2: values[5].value,
                price: values[6].value,
                topSpeed: values[7].value,
                from0to100: values[8].value,
                horsePower: values[9].value,
                wheels: values[10].value,
                img: values[11].value
            });
        console.log(values[11].value);
//
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                try {
                    var json = JSON.parse(xmlhttp.responseText);
                } catch {
                    document.getElementById("row").innerHTML = "Haulla ei löytynyt mitään";
                }
            }
        };
        xmlhttp.open("PUT", "http://localhost:8082/cars/" + number, true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(data);
        alert("Auton muokkaus onnistui!");
        searchCar();
    }
}

function imageHover(image) {
    var div = document.getElementById("image");
    div.style.display = "block";
    var imageDiv = document.getElementById("imageContent");
    console.log(image);
    imageDiv.innerHTML = `<img onerror="loadError()" src='${image}' class="center"/>`;
}

function showList(json) {
    var locationInfo = document.getElementById("locationInfo");

    locationInfo.innerHTML =
        "<table id='table'>" +
        "<tr>" +
        "<th>Tunnus</th>" +
        "<th>Merkki</th>" +
        "<th>Malli</th>" +
        "<th>Valmistus- vuosi</th>" +
        "<th>Polttoaine</th>" +
        "<th>Paino (kg)</th>" +
        "<th>CO2 (g/km)</th>" +
        "<th>Hinta (€)</th>" +
        "<th>Maksimi- nopeus (km/h)</th>" +
        "<th>Nollasta sataan (sek)</th>" +
        "<th>Hevos- voimat</th>" +
        "<th>Vetävät renkaat</th>" +
        "<th style='display:none'>Kuvan Url</th>"
        "<th></th>" +
        "<th></th>" +
        "<th></th>" +
        "</tr>" +
        "</table>";

    for (var i = 0; i < json.length; i++) {
        var row = locationInfo.firstChild.insertRow(-1);
        var id = json[i].AutoId;
        var image = json[i].Kuva;
        image = image.toString();
        var helper = "'";
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
        var noob = row.insertCell(12);
        noob.style.display = "none";
        noob.innerHTML = (image);
        row.insertCell(13).innerHTML = `<button type='button' onclick='deleteButton(${id})' name='deletebtn'>Poista</button>`
        row.insertCell(14).innerHTML = `<button id="modBtn" onclick='modifyButton(${id})'>Muokkaa</button>
                                              <div id="myModal" class="modal">
                                                <div class="modal-content">
                                                    <span class="close">&times;</span>
                                                    <div id="content"></div>
                                                    <button id="saveBtn">Tallenna muutokset</button>
                                                </div>
                                              </div>`;
        row.insertCell(15).innerHTML = `<button type='button' onclick="imageHover(${helper + image + helper})" name='hmm'>Näytä kuva</button>`


    }
}