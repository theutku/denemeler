//Require Modules ======================

var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');


//Require Static Files =================

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Define Database Properties ===========

var db = mysql.createConnection({ 
	host: 'localhost',
	user: 'root',
	port: '3400',
	password: '12345',
	database: 'quiz'
});


//Connect to Database =================

db.connect(function(err) {
	if(err){
		console.log('Database connection failed');
		throw err;
		
	} else {
		console.log('Database connection succesful');
	}
});


//Listen Connection ==================

app.listen(3946, function(err) {
	if(err) {
		console.log('Localhost connection error');
		throw err;
	} else {
		console.log('Localhost connection succesful at ' + this.address().port);
	}
});


//Define Query Variables =============

var listItems = 'SELECT * from crudtable';
var insertItem = 'INSERT INTO crudtable(firstname, lastname, email, comments, date) VALUE(?, ?, ?, ?, ?)';
var updateItem = 'UPDATE crudtable SET '


//List Database Records ==============

db.query(listItems, function(err, results) {
	if(err) {
		console.log('Database search error');
		throw err;
	} else if (!results.length) {
		console.log('No records were found.')
	} else {
		console.log(results);
	}
});


//List Database Records to the List in the Submitted Page ======
/*
app.get('/submitted.html', function(req, res) {
	db.query(listItems, function(err, results) {
		if(err) {
			console.log('Error performing database listing.');
		} else if(!results.length) {
			var display = req.body.firstItem;
			display = "No records."
			console.log('No records.');
		} else {
			var records = [];
			for(i=0; i<rows.length; i++) {
				records += rows[i];
			}
		}
	})
});
*/

//Insert Form Data into Database ====

app.post('/saveperson', function(req, res) {
	var first = req.body.first_name;
	var last = req.body.last_name;
	var email = req.body.email;
	var comment = req.body.comments;
	var timeDate = new Date();

	if((first != null || first != "") && (last != null || last != "") && (email != null || email != "") && (comment != null || comment != "")) {
		db.query(insertItem, [first, last, email, comment, timeDate], function(err) {
			if(err) {
			    res.sendStatus(500);
				console.log('Database write error');
			} else {
				console.log('Database save succesful');
			}
		});
	}
});
