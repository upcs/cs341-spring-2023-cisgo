var express = require('express');
var router = express.Router();
var mysql = require('mysql');


router.get('/', function(req, res, next) {
    var con = mysql.createConnection({
        host: "",
        user: "",
        password: "",
        database: ""
    })
    con.connect(function(err) {
        if(err) throw err;
        //console.log("Connected");
        con.query("SELECT * FROM csvjson", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        })
    })
});

module.exports = router;
