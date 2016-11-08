// Require and Set Modules =====================================

var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var userModel = require('../models/user');

var router = express.Router();

// GET Homepage ================================================

router.get('/', function(req, res) {
    res.render('index', {
        title: 'ContactsApp'
    });
});

// GET Register Page ===========================================

router.get('/users/register', function(req, res) {
    res.render('register', {
        title: 'Register',
        errors: []
    });
});

// GET Account Page ============================================

router.get('/users/account', function(req, res) {
    res.render('account', {
        title: 'Account',
    });
});

// GET Login Page ==============================================

router.get('/users/login', function(req, res) {
    res.render('login', {
        title: 'Login'
    });
});

// GET Contacts Page ===========================================

router.get('/users/contacts', function(req, res) {
    res.render('contacts', {
        title: 'Contacts'
    });
});

// POST Login Page =============================================

router.post('users/login', passport.authenticate('local-login', {
    successRedirect: '/users/contacts',
    failureRedirect: '/users/login',
    failureFlash: false
}));

// POST Register Page ==========================================

router.post('/users/register', function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    //Form Validation  =========================================
    req.checkBody('username', 'A valid username is necessary.').notEmpty();
    req.checkBody('email', 'A valid e - mail address is necessary.').notEmpty();
    req.checkBody('email', 'E - mail address is not valid.').isEmail();
    req.checkBody('password', 'A valid password is necessary.').notEmpty();
    req.checkBody('password2', 'Passwords do not match.').equals(password);

    var formErrors = req.validationErrors();

    if(formErrors) {
        console.log('Registration form not fulfilled.');
        res.render('register', {
            title: 'Register - Error',
            errors: formErrors
        });
    } else {
        var dateNow = new Date();

        var newUser = {
            username: username,
            email: email,
            password: password,
            date: dateNow
        }

        userModel.createUser(newUser, function(err, userExist, emailExist) {
            if(err) {
                console.log('Error creating new user.');
                req.flash('errorMsg', 'Error creating user.');
                res.redirect('/users/register');
            } else if(userExist) {
                req.flash('errorMsg', 'Username already taken.');
                res.redirect('/users/register');
            } else if(emailExist) {
                req.flash('errorMsg', 'E - mail address already taken.');
                res.redirect('/users/register');
            } else {
                req.flash('successMsg', 'Account created. Please login to continue.');
                res.redirect('/users/login');
            }
        });
    }
});


//Export Module ================================================

module.exports = router;


