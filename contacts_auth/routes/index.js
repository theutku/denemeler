// Require and Set Modules =====================================

var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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
        title: 'Register'
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
    failureFlash: true
}));

// POST Register Page ==========================================

module.exports = router;


