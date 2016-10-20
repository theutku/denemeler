//Require and Set Modules ==================

var express = require('express');
var app = express();
var routes = require('./routes');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

//Require Guitarist Data ============

app.locals.appdata = require('./data.json');

//Use Routes File for Routing ========

app.use('/', routes)

//Listen Connection ==================

app.listen(3000, function(err) {
    if(err) {
        console.log('Error listening connection.');
    } else {
        console.log('Listening on port ' + this.address().port);
    }
});


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
        message: err.message,
        error: {}
    });
});

//Export App =========================
module.exports = app;

