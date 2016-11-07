var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '12345',
    database: 'quiz'
});

db.connect(function(err) {
    if(err) {
        console.log('Error connecting to database.');
        throw err;
    } else {
        console.log('Connected to database: ' + db.config.database);
    }
});

