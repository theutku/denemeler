const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const apiRouter = require('./routes/api.js');
const mainRouter = require('./routes/main.js');

const db = 'localhost://'

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

mongoose.connect(db, (err) => {
    (err) ? console.log('Error connecting to database.') : console.log('Successfully connected to database: ' + db); 
});

app.use('/users', apiRouter);
app.use('/', mainRouter);

app.listen(port, function(err) {
    if(err) {
        console.log('Error listening app')
        throw err;
    } else {
        console.log('App started listening at port:' + this.address().port);
    }
});

module.exports = app;
