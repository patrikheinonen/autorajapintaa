var express = require("express");
var app = express();
var mysql = require("mysql2");
var url = require("url");
var path = require("path");
var util = require("util");
var bodyParser = require("body-parser");

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ryhma8password",
    database: "car_database"
});

const query = util.promisify(con.query).bind(con);

con.connect(function (err) {
    if (err) throw err;
});
//tarvitset tätä perkele!
app.get("/", function (req, res) {
    res.sendFile(path.join(process.cwd(), '/views/index.html'));
});

app.get("/cars", async function (req, res) {

    var q = url.parse(req.url, true).query;
    var malli = q.name;
    if (malli == null || malli.length === 0) {
        var sql = "SELECT * FROM auto";
    } else {
        var sql = "SELECT * FROM auto WHERE Malli = ?";
    }
    try {
        const json = await query(sql, [malli]);
        if (json.length === 0) {
            res.send(null)
        } else {
            res.send(json);
        }
    } catch (err) {
        console.log("Database Error!");
    }

});

function post(req, res) {
    var sql = "INSERT INTO Auto VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    var mark = req.body.Merkki;
    var model = req.body.Malli;
    var year = req.body.Valmistusvuosi;
    var fuel = req.body.Polttoaine;
    var weight = req.body.Paino;
    var co2 = req.body.CO2;
    var price = req.body.Hinta;
    var topSpeed = req.body.MaxNopeus;
    var from0to100 = req.body.NollastaSataan;
    var horsePower = req.body.HevosVoimat;
    var wheels = req.body.VetävätRenkaat;

    (async () => {
        try {
            const json = await query(sql, [null, mark, model, year, fuel, weight, co2, price, topSpeed, from0to100, horsePower, wheels]);
            res.send(json);
        } catch (err) {
            console.log("Database Error!");
        }
    })();
}

app.post("/cars", function (req, res) {
    post(req, res);
});


app.put("/cars", async function (req, res) {
    var q = url.parse(req.url, true).query;
    var id = q.id;
    var sql = "SELECT * FROM auto WHERE AutoID = ?";
try {
    const json = await query(sql, [id]);
    if (json.length === 0) {
        post(req, res);
    } else {
        var sql = "UPDATE Auto SET Merkki = ?, Malli = ?, Valmistusvuosi = ?, Polttoaine = ?, Paino = ?, CO2 = ?, Hinta = ?, MaxNopeus = ?, NollastaSataan = ?, HevosVoimat = ?, VetävätRenkaat = ? WHERE AutoID = ?";
        var mark = req.body.Merkki;
        var model = req.body.Malli;
        var year = req.body.Valmistusvuosi;
        var fuel = req.body.Polttoaine;
        var weight = req.body.Paino;
        var co2 = req.body.CO2;
        var price = req.body.Hinta;
        var topSpeed = req.body.MaxNopeus;
        var from0to100 = req.body.NollastaSataan;
        var horsePower = req.body.HevosVoimat;
        var wheels = req.body.VetävätRenkaat;
        (async () => {
            try {
                const json = await query(sql, [mark, model, year, fuel, weight, co2, price, topSpeed, from0to100, horsePower, wheels, id]);
                res.send(json);
            } catch (err) {
                console.log("Database Error!");
            }
        })();
    }
} catch (err) {
    console.log("Database Error!");
}
})


app.delete("/cars", function (req, res) {
    var q = url.parse(req.url, true).query;
    var sql = "DELETE FROM Auto WHERE AutoId = ?";
    var id = q.id;

    (async () => {
        try {
            const json = await query(sql, [id]);
            res.send(json);
        } catch (err) {
            console.log("Database Error!");
        }
    })();

});

try {
    app.listen(8082, function () {
        console.log("http://localhost:8082/");
    });
} catch {

}
;