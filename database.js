// database.js

/*
 * Usage:
 * 		$node database.js
 *		
 * queries are done like so (call this from inside React, maybe using AJAX/jQuery?):
 * 		localhost:3000/?query=SQL_STATEMENT_HERE
 *
 * note: may need to convert special chars to html-escaped versions, should be a node package to do this
 *		
 * returns JSON-style result from mysql
 *
 */

// global vars
var express = require("express");
var mysql = require("mysql");

var app = express();

var connection = mysql.createConnection({
      host     : "mtextrdb.ccvhwbbqcqrz.us-west-2.rds.amazonaws.com",
      //host     : "localhost",
      user     : "ajinoc",
      password : "adminpass",
      database : "CS130"
});

app.get('/', function (req, res) {
	connection.query(req.query['query'], function (err, rows) {
        if (err) {
            res.send(err);
            return;
        }
        
		res.send(rows);
	});
});

app.listen(3000, function() {
	console.log("Database server listening on port 3000.\nQuery using localhost:3000/?query=SQL_STATEMENT_HERE");
});
