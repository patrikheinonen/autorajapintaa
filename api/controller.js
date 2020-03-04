var express = require("express");
var app = express();
var mysql = require("mysql2");
var url = require("url");
var path = require("path");
var util = require("util");
var bodyParser = require("body-parser")


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ryhma8password",
    database: "car_database"
});

const query = util.promisify(con.query).bind(con);

con.connect(function(err) {
    if (err) throw err;
});
//tarvitset tätä perkele!
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname+"/views/index.html"));
});

app.get("/cars", function(req,res){
    var q = url.parse(req.url, true).query
    var malli = q.name;
    var sql = "SELECT * FROM Auto WHERE Malli = ?";

    (async () => {
        try {
            const json = await query(sql, [malli]);
            res.send(json);
        } catch(err) {
            console.log("Database Error!");
        }
    })();


});

app.use(bodyParser.urlencoded({
    extended: false }));
app.use(bodyParser.json());

/*app.post("/api/location", function (req, res) {

    var sql = "INSERT INTO Car VALUES (?, ?, ?, ?, ?, ?, )";
    var id = req.body.Location_id;
    var name = req.body.Location_name;
    var address = req.body.Street_address;
    var city = req.body.City;
    var zip = req.body.Zip;
    var country = req.body.Country;

    (async () => {
        try {
            const json = await query(sql, [id, name, address, city, zip, country]);
            res.send(json);
        } catch(err) {
            console.log("Database Error!");
        }
    })();
});*/

try {
    app.listen(8081, function () {
        console.log("http://localhost:8081/index");
    });
} catch {

}