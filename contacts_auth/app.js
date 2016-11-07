//Require and Set Modules =====================================

var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var passport = require('passport');
var flash = require('connect-flash');

var port = process.env.PORT || 3000;
var app = express();

var routes = require('./routes/index');

//Set View Engine =============================================

app.set('views', __dirname + '/views');
app.set('view-engine', 'ejs');

//Initialize Modules ==========================================

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());

app.use(express.static(__dirname + '/public'));

//Passport ====================================================

var passModel = require('./models/user');
passModel(passport);

//Validator ===================================================

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

//Global Flash Variables =======================================

app.use(function(req, res, next) {
    res.locals.errorMsg = req.flash('errorMsg');
    res.locals.successMsg = req.flash('successMsg');
    res.locals.logoutMsg = req.flash('logoutMsg');
});

// Routes ======================================================

app.use('/', routes);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler ===================================

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

// production error handler ===================================

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.render('error', {
        title: 'Error',
        message: 'Something went wrong!',
        page: 'error',
    });
});

//Listen Connection ===========================================

app.listen(port, function(err) {
    if(err) {
        console.log('Error listening connection');
        throw err;
    } else {
        console.log('App started listening on port: ' + this.address().port);
    }
});

//Export App ==================================================

module.exports = app;