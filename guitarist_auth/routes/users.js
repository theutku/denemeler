//Define Modules ============================

var express = require('express');
var router = express.Router();
var Sql = require('../models/user');

//GET Login Page ============================

router.get('/login', function(req, res) {
    res.render('login', {
        title: 'Login'
    });
});

//GET Register Page =========================

router.get('/register', function(req, res) {
    res.render('register', {
        title: 'Register',
        errors: []
    });
});

//POST Register Page ========================

router.post('/register', function(req, res) {
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    //Form Validation =======================
    req.checkBody('name', 'Please enter a valid name.').notEmpty();
    req.checkBody('username', 'Please enter a valid username.').notEmpty();
    req.checkBody('email', 'E - mail is not valid.').isEmail();
    req.checkBody('email', 'E - mail is not valid.').notEmpty();
    req.checkBody('password', 'Password must not be empty.').notEmpty();
    req.checkBody('password2', 'Passwords do not match.').equals(password);

    var formErrors = req.validationErrors();
    
    if(formErrors) {
        res.render('register', {
            title: 'Error - Register',
            errors: formErrors
        });
    } else {
        var date = new Date();
        Sql.sqlInsert(name, username, email, password, date);
        res.redirect('/home');
    }
});

module.exports = router;