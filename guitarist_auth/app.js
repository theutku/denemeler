//Require and Set Modules ==================

var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var passport = require('passport');
var flash = require('connect-flash');

var port = process.env.PORT || 3000;
var app = express();

var routes = require('./routes/index');

app.locals.appdata = require('./data.json');

//Passport ===========================================



//Set View Engine ====================================

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Initialize Modules =================================

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(__dirname + '/public'));

var userPass = require('./models/user')
userPass.passConfig(passport);

//Validator ==========================================

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Global Flash Variables ============================

app.use(function(req, res, next) {
    res.locals.logoutMsg = req.flash('logoutMsg');
    res.locals.errorMsg = req.flash('errorMsg');
    res.locals.user = req.user || null;
    next();
})

//Routes ====================================

app.use('/', routes);

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
        console.log(err);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'Error',
            page: 'error'
        });
    });
}

// production error handler ========

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.render('error', {
        title: 'Error',
        message: 'Something went wrong!',
        page: 'error',
    });
});

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

