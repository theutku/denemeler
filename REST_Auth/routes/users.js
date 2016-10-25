//Require Modules ======================================

var express = require('express');
var router = express.Router();

//Register =============================================

router.get('/register', function(req, res) {
    res.render('register', {
        title: 'Register - AuthApp'
    });

});

//Login ================================================

router.get('/login', function(req, res) {
    res.render('login', {
        title: 'Login - AuthApp'
    });

});

module.exports = router;