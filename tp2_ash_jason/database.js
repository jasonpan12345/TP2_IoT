var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'tp2-gestion-iot.database.windows.net', // Replace with your host name
  user: 'jasonpan',      // Replace with your database username
  password: 'tp2-gestion-admin',      // Replace with your database password
  database: 'iot-gestion-tp2' // // Replace with your database Name
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;