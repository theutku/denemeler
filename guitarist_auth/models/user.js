var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;

//Connect MySQL Database =============================

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

//Database Query and Variables ===============================================================

var listAll = 'SELECT * from guitarist';
var insertItem = 'INSERT INTO guitarist(name, username, email, password, date) VALUE(?, ?, ?, ?, ?)';
var getItem = 'SELECT * from guitarist WHERE username = ?';
var getById = 'SELECT * from guitarist where id = ?';
var deleteItem = 'DELETE from guitarist WHERE id = ?';
var getEmail = 'SELECT * from guitarist where email = ?'

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

//Export User Module ===================================

var User = module.exports;

//Save New User with Hash ============================================================

User.sqlCreate = function(newUser, callback) {
    
    //User Creation Function ===========================================
    var createUser = function() {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                newUser.password = hash;

                db.query(insertItem, [newUser.name, newUser.username, newUser.email, newUser.password, newUser.date], function (err) {
                    if (err) {
                        console.log('Database write error');
                        callback(err, false, false);
                    } else {
                        console.log('Database save succesful');
                        callback(null, false, false);
                    }
                });
            });
        });
    }

    //Check if username exists ================================
    db.query(getItem, newUser.username, function(err, usernames) {
        if(usernames.length) {
            console.log('Username already exists.');
            callback(null, true, false);
        } else {

            //Check if e-mail address exists ================================    
            db.query(getEmail, newUser.email, function(err, emails) {
                if(emails.length) {
                    console.log('Email already exists.');
                    callback(null, false, true);
                } else {
                    createUser();
                }
            });
        }
    });

};

User.findIdByUsername = function(username) {
    db.query(getItem, username, function(err, rows) {
        if (err) {
            res.sendStatus(err.status || 500);
            console.log('Database find error.');
        }
        if(rows.length == 0) {
            console.log('No such user found.');
        } else {
            console.log('User found successfully.');
            return rows[0].id;
        }
    });
};

User.findUserById = function(id) {
    db.query(getById, id, function(err, rows) {
        if (err) {
            res.sendStatus(err.status || 500);
            console.log('Database find error.');
        } else {
            console.log('User found successfully.');
            return rows[0];
        }        
    });
}

User.deleteUser = function(userid) {
        db.query(deleteItem, userid, function(err) {
            if(err){
                console.log('Error updating database.');
            }else {
                console.log('User deleted.');
            }
        });
    
}

//Passport Configuration =====================================

User.passConfig = function(passport) {

    //Serialize ======================================
    passport.serializeUser(function(user, done) {
        return done(null, user.id);
    });

    //Deserialize ====================================
    passport.deserializeUser(function(id, done) {
        db.query(getById, id, function(err, rows) {
            return done(null, rows[0]);
        });
    });

    //Local Login ============================================
    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
    }, function(req, username, password, done) {
        db.query(getItem, username, function(err, rows) {
            if(err) {
                return done(err);
            } 
            
            if(!rows.length) {
                return done(null, false, req.flash('errorMsg', 'User not found.'));
            }
            
            bcrypt.compare(password, rows[0].password, function(err, match) {
                if(err) {
                    return done(err);
                } 
                if(!match) {
                    return done(null, false, req.flash('errorMsg', 'Invalid Password.'));
                } else {
                    return done(null, rows[0]);
                }
            });
        });
    }));

}


