//Load Modules =================================

var localStrategy = require('passport-local').Strategy;
var user = require('../routes/user');

//Expose the Function to App ===================

module.exports = function(passport) {

    //PASSPORT SESSION SETUP ===================
    //Serialize User for the Session ===========
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    //Deserialize User for the Session =========
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //LOCAL SIGNUP =============================
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({
                'local.email': email,
                function(err, user) {
                    if(err) {
                        return done(err);
                    }
                    
                    //Check If There is a User with the Same Email ===========
                    if(user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        var newUser = new User();

                        //Set User's Local Credentials
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);

                        //Save the User ===============
                        newUser.save(function(err) {
                            if(err) {
                                console.log(err);
                                throw err;
                            } else {
                                return done(null, newUser);
                            }
                        });
                    }
                }
            });
        });
    }

    ));
}