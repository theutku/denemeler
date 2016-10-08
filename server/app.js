//Require Modules

var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

//Database Connection Properties

var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	port: '3400',
	password: '12345',
	database: 'quiz'
});


//Serving Static Files

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Query Strings

var insertUser = 'INSERT INTO scoretable(username, email, regTime) VALUE(?,?,?)'; 
var readTable = 'SELECT * FROM scoretable'; 
var updateScore = 'UPDATE scoretable SET score = ? WHERE name=?'; 
var deleteUser = 'DELETE FROM scoretable WHERE name=?'; 


//Get Posted User Data from Form in index.html

app.post('/quiz', function(req, res) {
	var username = req.body.username;
	var email = req.body.emailAdd;
	var date = new Date().toString();
	console.log('\nUser Input:\n' + 'Username = ' + username + '\n' + 'E - Mail Address = ' + email);

	//Save New User to Database

	if((username != "" || username != null) && (email != "" || email != null)){
		db.query(insertUser, [username, email, date], function(err) {
			if(err) {
				throw err;
				console.log('Database write error\n');
			} else {
				console.log('Write to database successful');
			}
		});

		res.sendFile(__dirname + '/public/quiz.html');
	}
	
});

//Save Score to Database

app.post('quiz/submitScore', function(res, req) {
	console.log(req.body);
	res.send('Done');

});

//List Scores from Database

function listScores() {

	db.query(readTable, function(err, rows) {
		if(err) {
			throw err;
			console.log('Listing failed');
		} else {
			for(var i; i < rows.length; i++) {
				console.log(rows[i].username);
			}
		}
	});
};

//Database Connection

db.connect(function(err) {
	if(err) {
		console.log('Database connection error');
	} else {
		console.log('Connection to database successful');
	}
});


//Database Simple Query

db.query(readTable, function(error, results) {
	
	if(error) {
		throw error;
	} else {
		console.log(results);
		
	}
});


//Listen Port

app.listen(3946, function(){
	console.log('Listening on port ' + this.address().port);
});


//Export Module

module.exports = app;


