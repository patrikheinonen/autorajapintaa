var express = require("express");
var app = express();
var mysql = require("mysql2");
var url = require("url");
var path = require("path");
var util = require("util");
var bodyParser = require("body-parser");

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: false }));
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "car_database"
});

const query = util.promisify(con.query).bind(con);

con.connect(function(err) {
    if (err) throw err;
});
//tarvitset tätä perkele!
app.get("/", function(req, res) {
    res.sendFile(path.join(process.cwd(), '/views/index.html'));
});

app.get("/cars", function(req,res){
    var q = url.parse(req.url, true).query;
    var malli = q.name;

    if (malli.length === 0) {
        var sql = "SELECT * FROM auto";
    } else {
        var sql = "SELECT * FROM auto WHERE Malli = ?";
    }
    (async () => {
        try {
            const json = await query(sql, [malli]);
            if (json.length === 0) {
                res.send(null)
            } else {
                res.send(json);
            }

        } catch(err) {
            console.log("Database Error!");
        }
    })();
});

try {
    app.listen(8082, function () {
        console.log("http://localhost:8082/index");
    });
} catch {

}