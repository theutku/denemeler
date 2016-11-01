var mysql = require('mysql');
var bcrypt = require('bcryptjs');

//Connect MySQL Database =============================

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3400',
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

//Database Query and Variables ===============================================================

var listAll = 'SELECT * from guitarist';
var insertItem = 'INSERT INTO guitarist(name, username, email, password, date) VALUE(?, ?, ?, ?, ?)';
var deleteItem = 'DELETE from guitarist where id=?';
var getItem = 'SELECT * from guitarist WHERE username = ?';

db.query(listAll, function(err, results) {
    if(err) {
		console.log('Database search error');
		throw err;
	} else if (!results.length) {
		console.log('No records were found.')
	} else {
		console.log(results);
	}
});

//Export SQL ===================================

var Sql = module.exports;

//Save New User with Hash ============================================================

Sql.sqlInsert = function(name, username, email, password, date) {

    // bcrypt.genSalt(10, function (err, salt) {
    //     bcrypt.hash(password, salt, function (err, hash) {
    //         password = hash;

            db.query(insertItem, [name, username, email, password, date], function (err) {
                if (err) {
                    res.sendStatus(500);
                    console.log('Database write error');
                } else {
                    console.log('Database save succesful');
                }
            });
    //     });
    // });

};

Sql.findUserByUsername(function(username) {
    db.query(getItem, id, function(err, rows) {
        if (err) {
            res.sendStatus(err.status || 500);
            console.log('Database find error.');
        } else {
            console.log('User found successfully.');
            return rows[0].id;
        }
    });
});

Sql.deleteUser = function(id) {
    db.query(deleteItem, id, function() {
        if (err) {
            res.sendStatus(500);
            console.log('Database delete error');
        } else {
            console.log('User successfully removed.');
        }
    })
}


