//Define Modules ========================

var express = require('express');
var router = express.Router();
var Sql = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Require Guitarists Data ==============

var appdata = require('../data.json');

//Get Index Page ==========================

router.get('/', function (req, res) {
  res.render('index', {
    title: 'Top Guitarists - Welcome',
  });
});

//Get HomePage ==========================

router.get('/home', isLoggedIn, function (req, res) {
  var myArtwork = [];
  var myGuitarists = appdata.guitarists;

  myGuitarists.forEach(function (item) {
    myArtwork = myArtwork.concat(item.artwork);
  });
  res.render('home', {
    title: 'Top Guitarists',
    artwork: myArtwork,
    guitarists: myGuitarists,
    page: 'home',
    username: req.user.username
  });
});

//GET Guitarists Page ==================

router.get('/guitarists', isLoggedIn, function (req, res) {
  var myArtwork = [];
  var myGuitarists = appdata.guitarists;

  appdata.guitarists.forEach(function (item) {
    myArtwork = myArtwork.concat(item.artwork);
  });
  res.render('guitarists', {
    title: 'Guitarists',
    artwork: myArtwork,
    guitarists: myGuitarists,
    page: 'guitaristList',
    username: req.user.username
  });
});

//GET Specific Guitarists Page ==================

router.get('/guitarists/:guitaristid', isLoggedIn, function (req, res) {
  var myArtwork = [];
  var myGuitarists = [];

  appdata.guitarists.forEach(function (item) {
    if (item.shortname == req.params.guitaristid) {
      myGuitarists.push(item);
      myArtwork = myArtwork.concat(item.artwork);

    }
  });
  res.render('guitarists', {
    title: myGuitarists[0].title,
    artwork: myArtwork,
    guitarists: myGuitarists,
    page: 'guitarist',
    username: req.user.username
  });
});

//GET Login Page ============================

router.get('/users/login',isNotLoggedIn, function(req, res) {
    res.render('login', {
        title: 'Login'
    });
});

//POST Login Page ===========================

router.post('/users/login', isNotLoggedIn, passport.authenticate('local-login', {
  successRedirect: '/home',
  failureRedirect: '/users/login',
  failureFlash: true
}));

//GET Register Page =========================

router.get('/users/register', isNotLoggedIn, function(req, res) {
    res.render('register', {
        title: 'Register',
        errors: []
    });
});

//POST Register Page ========================

router.post('/users/register', isNotLoggedIn, function(req, res) {
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    //Form Validation =======================
    req.checkBody('name', 'Please enter a valid name.').notEmpty();
    req.checkBody('username', 'Please enter a valid username.').notEmpty();
    req.checkBody('email', 'E - mail is not valid.').isEmail();
    req.checkBody('email', 'E - mail must not be empty.').notEmpty();
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

        var newUser = {
          name: name,
          username: username,
          email: email,
          password: password,
          date: date
        };

        //Check Database and Create User =========================================
        Sql.sqlCreate(newUser, function(err, usernameExist, emailExist) {
          if(usernameExist) {
            req.flash('errorMsg', 'Username already taken.');
            res.redirect('/users/register');
          } else if(emailExist) {
            req.flash('errorMsg', 'E-mail address already taken.');
            res.redirect('/users/register');
          } else if(err) {
            req.flash('errorMsg', 'Error creating user.');
            res.redirect('/users/register');
            console.log(err);      
          } else {
            req.flash('successMsg', 'Registration successful. Login to continue.')
            res.redirect('/users/login');
          }
        });
        
    }
});

//GET Profile ==================================

router.get('/users/profile', isLoggedIn, function(req, res) {
  res.render('profile', {
    title: 'Profile'
  })
});

//DELETE User ==================================

router.post('/users/delete', isLoggedIn, function(req, res) {
  Sql.deleteUser(req.user.id, function(err, dbErr) {
    if(dbErr) {
      console.log(err);
      req.flash('errorMsg', 'Error deleting user.');
      res.redirect('/users/profile');
    } else {
      req.flash('logoutMsg', 'Your account has been deleted.');
      res.redirect('/');
      req.logout();
    }
    
  });
});

//LOGOUT =======================================

router.get('/logout', isLoggedIn, function(req, res) {
  req.logout();
  req.flash('logoutMsg', 'Logout successful.');
  res.redirect('/');
});

//Authentication Check =========================

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    req.flash('errorMsg', 'Login is required to visit the page.');
    res.redirect('/users/login');
  }
}

function isNotLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    req.flash('logoutMsg', 'You are already logged in. Logout to continue.')
    res.redirect('/');
  } else {
    return next();
  }
}

//Export Module ================================

module.exports = router;
