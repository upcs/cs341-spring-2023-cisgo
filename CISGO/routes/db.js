var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.post('/', function(req, res, next) {
    var con = mysql.createConnection({
        host: "10.13.6.44",
        user: "cisgouser",
        password: "cisgo",
        database: "cisgo"
    })
    con.connect(function(err) {
        if(err) throw err;
        //console.log("Connected");
        console.log(req.body.query);
        con.query(req.body.query, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        })
    })
});

module.exports = router;
