
'user strict';
 
const mysql = require('mysql2/promise');


const dbConn = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "mycode",
  password: "root",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// dbConn.connect(function(err) {
//   if (err) throw err;
//   console.log("Database Connected successfully");
// });
module.exports = dbConn;