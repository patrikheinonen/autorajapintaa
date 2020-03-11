var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mysql = require("mysql2");
var url = require("url");
var path = require("path");
var util = require("util");


app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "dbpass",
    database: "car_database"
});

const query = util.promisify(con.query).bind(con);

con.connect(function (err) {
    if (err) throw err;
});

app.get("/", function (req, res) {
    res.sendFile(path.join(process.cwd(), '/views/index.html'));
});
app.get("/cars/:name", async function (req, res) {

    var {name} = req.params;
    var sql = "SELECT * FROM auto WHERE Malli = ?";

    try {
        let json = await query(sql, [name]);
        if (json.length === 0) {
            sql = "SELECT * FROM auto WHERE Merkki = ?";
            json = await query(sql, [name]);
            if (json.length === 0) {
                res.send(null)
            } else {
                res.send(json);
            }//
        } else {
            res.send(json);
        }
    } catch (err) {
        res.sendStatus(500);
        console.log("Database Error!1");
        console.log(err)
    }

});

app.get("/cars", async function (req, res) {

    var sql = "SELECT * FROM auto";
    try {
        let json = await query(sql);
        if (json.length === 0) {
            res.send(null);
        } else {
            res.send(json);
        }
    } catch (err) {
        res.sendStatus(500);
        console.log("Database Error!2");
        console.log(err)
    }

});

function post(req, res) {
    var sql = "INSERT INTO Auto VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    var mark = req.body.mark;
    var model = req.body.model;
    var year = req.body.year;
    var fuel = req.body.fuel;
    var weight = req.body.weight;
    var co2 = req.body.co2;
    var price = req.body.price;
    var topSpeed = req.body.topSpeed;
    var from0to100 = req.body.from0to100;
    var horsePower = req.body.horsePower;
    var wheels = req.body.wheels;
    var img = req.body.img;

    (async () => {
        try {
            const json = await query(sql, [null, mark, model, year, fuel, weight, co2, price, topSpeed, from0to100, horsePower, wheels, img]);
            res.send(json);
        } catch (err) {
            res.sendStatus(500);
            console.log("Database Error!3");
            console.log(err)
        }
    })();
}

app.post("/cars", function (req, res) {
    post(req, res);
});


app.put("/cars/:AutoId", async function (req, res) {
    var {AutoId} = req.params;
    var sql = "SELECT * FROM auto WHERE AutoID = ?";
    try {
        const json = await query(sql, [AutoId]);
        if (json.length === 0) {
            post(req, res);
        } else {
            var sql = "UPDATE Auto SET Merkki = ?, Malli = ?, Valmistusvuosi = ?, Polttoaine = ?, Paino = ?, CO2 = ?, Hinta = ?, MaxNopeus = ?, NollastaSataan = ?, HevosVoimat = ?, VetävätRenkaat = ?, Kuva = ? WHERE AutoID = ?";
            var mark = req.body.mark;
            var model = req.body.model;
            var year = req.body.year;
            var fuel = req.body.fuel;
            var weight = req.body.weight;
            var co2 = req.body.co2;
            var price = req.body.price;
            var topSpeed = req.body.topSpeed;
            var from0to100 = req.body.from0to100;
            var horsePower = req.body.horsePower;
            var wheels = req.body.wheels;
            var img = req.body.img;
            (async () => {
                try {
                    const json = await query(sql, [mark, model, year, fuel, weight, co2, price, topSpeed, from0to100, horsePower, wheels, img, AutoId]);
                    res.send(json);
                } catch (err) {
                    res.sendStatus(500);
                    console.log("Database Error4!");
                    console.log(err);
                }
            })();
        }
    } catch (err) {
        res.sendStatus(500);
        console.log("Database Error5!");
        console.log(err);
    }
});
//

app.delete("/cars/:AutoId", function (req, res) {
    var {AutoId} = req.params;
    var sql = "DELETE FROM Auto WHERE AutoId = ?";

    (async () => {
        try {
            const json = await query(sql, [AutoId]);
            res.send(json);
        } catch (err) {
            res.sendStatus(500);
            console.log("Database Error6!");
            console.log(err)
        }
    })();

});

try {
    app.listen(8082, function () {
        console.log("http://localhost:8082/");
    });
} catch (err) {
    console.log(err)
}
;