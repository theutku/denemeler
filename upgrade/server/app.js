const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const apiRouter = require('./routes/api');
const mainRouter = require('./routes/main');

const db = 'mongodb://localhost:27017/angupgrade';
mongoose.connect(db, (err) => {
    (err) ? console.log('Error connecting to database.') : console.log('Successfully connected to database: ' + db); 
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/', mainRouter);
app.use('/users', apiRouter);

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// })

app.listen(port, function(err) {
    if(err) {
        console.log('Error listening app')
        throw err;
    } else {
        console.log('App started listening at port:' + this.address().port);
    }
});

module.exports = app;
