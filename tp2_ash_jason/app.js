var express = require("express");
var path = require("path");

var app = express();
var routes = require("./routes");
var ejs = require('ejs');

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



io.on('connection', (socket) => {
    app.use(routes);
    socket.emit('message', "message sent");
    console.log('a user connected');
});

http.listen(app.get("port"), function () {
    console.log("Server starter on port " + app.get("port"))
});