//Require Modules =====================================================

var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;

//Connect Database ====================================================

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

//Export User Model Function ==========================================

var userModel = module.exports

//Database Query Variables ============================================

var findByUsername = 'SELECT * from contactsUser where username = ?';
var findById = 'SELECT * from contactsUser where id = ?';
var insertItem = 'INSERT INTO contactsUser(username, email) VALUE(?, ?)';
var deleteItem = 'DELETE from contactsUser where id = ?';

//USER MODEL ==========================================================
//Passport ============================================================

userModel.passConfig = function(passport) {

    //Serialize User ==================================================
    passport.serializeUser(function(user, done) {
        return done(null, user.id);
    })

    //Deserialize User ================================================
    passport.deserializeUser(function(id, done) {
        db.query(findById, id, function(err, result) {
            if(err) {
                console.log('Error searching database for deserialization.');
                return done(err);
            } 
            if(result.length) {
                console.log('User deserialized.');
                return done(null, result[0]);
            } else {
                console.log('Error deserializing. User not found.');
                return done(null, false);
            }
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
                    return done(null, result[0]);
                }
            });
        });
    }));



}
