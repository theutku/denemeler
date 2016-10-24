//Require Tools =================================
var express = require('express');
var app = express();
var port = process.env.PORT || 3946;
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

//Connect to Database ===========================

mongoose.connect(configDB.url);

//Set App Requirements ==========================

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(logger('dev')); 
app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./config/passport')(passport)
 

//Passport Requirements =========================

app.use(session({secret: 'utkuisthebest'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Routes ========================================

require('./routes/index')(app, passport);

//Launch App ====================================

app.listen(port, function(err) {
    if(err) {
        console.log('Error listening connection.');
    } else {
        console.log('Listening on port ' + this.address().port);
    }
})

module.exports = app;