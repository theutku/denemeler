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
		throw err;
		console.log('Localhost connection error');
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
		throw err;
		console.log('Database search error');
	} else if (!results.length) {
		console.log('No records were found.')
	} else {
		console.log(results);
	}
});

//Insert Form Data into Database ====

app.get('/listpersons', function(req, res) {
	res.send([
		{
		firstname: "Tansu"
	}, 
	{
		firstname: "Utku"
	}]);
});

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
	res.sendFile(__dirname + '/public/submitted.html');
});
