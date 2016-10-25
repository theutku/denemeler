//Require Modules ======================================

var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

//Register Page ========================================

router.get('/register', function(req, res) {
    res.render('register', {
        title: 'Register - AuthApp',
        errors: []
    });

});

//Login ================================================

router.get('/login', function(req, res) {
    res.render('login', {
        title: 'Login - AuthApp'
    });

});

//Register New User ====================================

router.post('/register', function(req, res) {
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    
    //Validation =======================================
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('email', 'E - mail is required').notEmpty();
    req.checkBody('email', 'E - mail is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    
    var errors = req.validationErrors();
      
    if(errors) {
        res.render('register', {
            title: 'Register - Error',
            errors: errors
        });
    } else {
        var newUser = new User({
            name: name,
            username: username,
            email: email,
            password: password
        });

        //Pass user to model =============================
        User.createUser(newUser, function(err, user){
            if(err) {
                console.log(err);
                throw err;
            } else {
                console.log(user);
            }
        });

        //Success Message and Redirect ===================
        req.flash('success_msg', 'You are now registered and can now login!');
        res.redirect('/users/login');
    }
    
});


//PASSPORT ===============================================
//Validate Password ======================================

passport.use(new LocalStrategy(function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
        if(err) {
            console.log(err);
            throw err;
        }
        if(!user) {
            return done(null, false, {message: 'Username is invalid.'});
        }
        User.comparePassword(password, user.password, function(err, isMatch) {
            if(err) {
                console.log(err);
                throw err;
            }
            if(isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Incorrect Password!'})
            }
        });
    });
}));

//Serialize and Deserialize =============================

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, done) {
        return done(err, user);
    });
});

//User Login ============================================

router.post('/login', 
    passport.authenticate('local', {successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }), 
    function(req, res) {
        res.redirect('/');
});

//Logout ================================================

router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out.');
    res.redirect('/users/login');
});

//Export Router =========================================
module.exports = router;