//Require Modules =====================================================

var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;

//Connect Database ====================================================

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

//Export User Model Function ==========================================

var userModel = module.exports

//Database User Query Variables =======================================

var findByUsername = 'SELECT * from contactsuser where username = ?';
var findById = 'SELECT * from contactsuser where id = ?';
var findByEmail = 'SELECT * from contactsuser where email = ?';
var insertItem = 'INSERT INTO contactsuser(username, email, password, date) VALUE(?, ?, ?, ?)';
var deleteItem = 'DELETE from contactsuser where id = ?';

//USER MODEL ==========================================================
//Save New User =======================================================

userModel.createUser = function(newUser, callback) {

    //User Creation Function ==========================================
    var createNewUser = function() {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                newUser.password = hash;

                db.query(insertItem, [newUser.username, newUser.email, newUser.password, newUser.date], function (err) {
                    if (err) {
                        console.log('Database write error.');
                        callback(err, false, false);
                    } else {
                        console.log('User successfully created.');
                        callback(null, false, false);
                    }
                });
            });
        });
    }

    //Check If Username Exists ==========================================================
    db.query(findByUsername, newUser.username, function(err, userResult) {
        if(err) {
            console.log('Error checking existing usernames for new user creation.');
            callback(err, false, false);
        } else if(userResult.length) {
            console.log('Username already taken.');
            callback(null, true, false);
        } else {

            //Check If Email Exists =====================================================
            db.query(findByEmail, newUser.email, function(error, emailResult) {
                if(error) {
                    console.log('Error checking existing emails for new user creation.');
                    callback(error, false, false);
                }
                if(emailResult.length) {
                    console.log('E - mail already taken.');
                    callback(null, false, true);
                } else {
                    createNewUser();
                }
            });

        }
    });
}

// Delete User Account ================================================

userModel.deleteUser = function(user, callback) {
    db.query(deleteItem, user.id, function(err) {
        if(err) {
            console.log('Error deleting user.');
            callback(err);
        } else {
            console.log('User successfully deleted.');
            callback(null);
        }
    })
}

//Passport ============================================================

userModel.passConfig = function(passport) {

    //Serialize User ==================================================
    passport.serializeUser(function(user, done) {
        console.log('User serialized.');
        return done(null, user.id);
    })

    //Deserialize User ================================================
    passport.deserializeUser(function(id, done) {
        db.query(findById, id, function(err, result) {
            return done(null, result[0]);
        });
    });
    
    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
    }, function(req, username, password, done) {
        db.query(findByUsername, username, function(err, result) {
            if(err) {
                console.log('Passport: Database error.');
                return done(err);
            }
            if(!result.length) {
                console.log('Passport: User not found.');
                return done(null, false, req.flash('errorMsg', 'User not found.'));
            }

            bcrypt.compare(password, result[0].password, function(err, match) {
                if(err) {
                    console.log('Bcrypt: Error');
                    return done(err);
                }
                if(!match) {
                    console.log('Bcrypt: Passwords do not match.');
                    return done(null, false, req.flash('errorMsg', 'Invalid password.'));
                } else {
                    console.log('Bcrypt: Passwords match.');
                    return done(null, result[0], req.flash('successMsg', 'Login successful.'));
                }
            });
        });
    }));



}
