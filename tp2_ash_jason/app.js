var express = require("express");
var path = require("path");

var app = express();
var routes = require("./routes");
var ejs = require('ejs');

var http = require('http').Server(app);
var io = require('socket.io')(http, {
    perMessageDeflate: false,
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

var db = require('./database')(io, "");

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(routes);

io.on('connection', (socket) => {

    console.log('a user connected');
    // recoit data du client
    socket.on('submitValues', function (data) {
        console.log("server received: " + data);
        require('./send_data')(data);
    });
    // demande data pour le graphique
    socket.on('requestData', function (data) {
        require('./database')(io, "requestData");
    });
});


http.listen(app.get("port"), function () {
    console.log("Server starter on port " + app.get("port"))
});