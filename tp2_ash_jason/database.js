var Connection = require('tedious').Connection;

var io;
module.exports = function(importIO) {
    io = importIO;
}

var config = {
    server: 'tp2-gestion-iot.database.windows.net',
    authentication: {
        type: 'default',
        options: {
            userName: 'jasonpan',
            password: 'tp2-gestion-admin'
        }
    },
    options: {
        // Microsoft Azure a besoin d'encryption
        encrypt: true,
        database: 'iot-gestion-tp2'
    }
};
var connection = new Connection(config);
connection.on('connect', function (err) {
    // Continue si pas d'erreur
    console.log("Connected to database");
    setInterval(function () {
        executeStatement(); // execute chaque 5 secondes
    }, 5000);

});

connection.connect();

var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

function executeStatement() {
    // select derniere data
    request = new Request("SELECT TOP 1 * FROM [dbo].[infos] ORDER BY time DESC;", function (err) {
        if (err) {
            console.log(err);
        }
    });
    var result = "";
    var resultJson = []

    request.on('row', function (columns) {

        var row = {};
        columns.forEach(function (column) {
            if (column.isNull) {
                row[column.metadata.colName] = null;
            } else {
                row[column.metadata.colName] = column.value;
            }
        });
        resultJson.push(row);

        io.emit('message', resultJson[0]);
        resultJson = [];
        row = {};
        result = "";
    });

    request.on('done', function (rowCount, more) {
        console.log(rowCount + ' rows returned');
    });

    request.on("requestCompleted", function (rowCount, more) {
        //connection.close();
        console.log("fetched database");
    });
    connection.execSql(request);
}