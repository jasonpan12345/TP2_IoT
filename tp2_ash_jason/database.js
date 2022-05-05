var Connection = require('tedious').Connection;  
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
connection.on('connect', function(err) {  
    // If no error, then good to proceed.
    console.log("Connected");  
});

//connection.connect();
module.exports = connection;