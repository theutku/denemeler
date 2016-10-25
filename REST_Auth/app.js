//Require Modules ========================================

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var logger = require('morgan');
var expressValidator = require('express-validator');
var mongo = require('mongodb');
var flash = require('connect-flash');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

var port = (process.env.PORT || 3000);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//Connect to Database ====================================

var db = mongoose.connection;
mongoose.connect('mongodb://localhost/authapp');

//Set Public Folder ======================================

app.use(express.static(__dirname + '/public'));

//Set View Engine ========================================

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//BodyParser =============================================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Passport ===============================================

app.use(passport.initialize());
app.use(passport.session());

//Express Session ========================================

app.use(session({
    secret: 'utkuisthebest',
    saveUninitialized: true,
    resave: true
}));

//Validator ==============================================

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

//Connect Flash ==========================================

app.use(flash());

//Global Messages ========================================

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Routes =================================================

app.use('/', routes);
app.use('/users', users);

//Listen App =============================================

app.listen(port, function(err) {
    if(err) {
        console.log(err);
        throw err;
    } else {
        console.log('App started listening at port ' + this.address().port);
    }
})