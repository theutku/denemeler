//Require and Set Modules ==================

var express = require('express');
var app = express();
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressValidator = require('express-validator');
var flash = require('connect-flash');

var port = process.env.PORT || 3000;

var routes = require('./routes/index');
var users = require('./routes/users');
var User = require('./models/user');

//Set View Engine ====================================

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Initialize Modules =================================

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(flash());

// app.use(session({
//     secret: 'utkuauth',
//     saveUninitialized: true,
//     resave: true
// }))
// app.use(passport.initialize());
// app.use(passport.session());

//Require Guitarist Data =============================

app.locals.appdata = require('./data.json');

// Global Messages ===================================
app.use(function(req, res, next) {
    res.locals.successMsg = req.flash('success_msg');
    res.locals.errorMsg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// catch 404 and forwarding to error handler

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler ===============

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler ========

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        title: 'Error',
        message: 'Something went wrong!',
        page: 'error',
    });
});

//Routes and Users ===================================

app.use('/', routes);
app.use('/users', users);

//Listen Connection ==================

app.listen(port, function(err) {
    if(err) {
        console.log('Error listening connection.');
        throw err;
    } else {
        console.log('App started listening on port ' + this.address().port);
    }
});

//Export App =========================

module.exports = app;

