var express = require("express");

var router = express.Router();

var db = require('./database')

router.get("/", function(req,res){
    console.log("Hello I'm on the start page here!");

    db.connect();

    res.render("index");
});

module.exports = router;