// database.js

var getConnection = function() {
    var mysql = require("mysql");
    var connection = mysql.createConnection({
      host     : "mtextrdb.ccvhwbbqcqrz.us-west-2.rds.amazonaws.com",
      user     : "ajinoc",
      password : "adminpass",
      database : "CS130"
    });

    connection.connect();
    return connection;
};
