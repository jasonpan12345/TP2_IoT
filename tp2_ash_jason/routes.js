var express = require("express");

var router = express.Router();

var db = require('./database')

router.get("/", function(req,res){
    console.log("Hello I'm on the start page here!");

    var sql='SELECT * FROM test';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
    });

    res.render("index");
});

module.exports = router;