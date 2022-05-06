var Connection = require('tedious').Connection;
// define module constructor that accepts the io variable
var io;
module.exports = function(importIO) {
    io = importIO;
}
var config = {
    server: 'tp2-gestion-iot.database.windows.net',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'jasonpan', //update me
            password: 'tp2-gestion-admin'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'iot-gestion-tp2'  //update me
    }
};
var connection = new Connection(config);
connection.on('connect', function (err) {
    // If no error, then good to proceed.
    console.log("Connected");
    setInterval(function () {
        executeStatement(); //this code runs every 10 seconds
    }, 5000);

});

connection.connect();

var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

function executeStatement() {
    // select latest data
    request = new Request("SELECT TOP 1 * FROM [dbo].[test] ORDER BY time DESC;", function (err) {
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
        /*
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });*/
        console.log(resultJson[0]);
        io.emit('message', resultJson[0]);
        resultJson = [];
        row = {};
        result = "";
    });

    request.on('done', function (rowCount, more) {
        console.log(rowCount + ' rows returned');
    });

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        //connection.close();
        console.log("request done");
    });
    connection.execSql(request);
}


//module.exports = connection;