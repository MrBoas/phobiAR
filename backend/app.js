var createError = require('http-errors');
const express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require("body-parser")

const app = express();
app.set('view engine', 'pug');

// Variaveis
app.address = 'localhost'
// app.address = 'gepl.di.uminho.pt'
app.port = 10201
app.locals.url = "http://" + app.address + ":" + app.port + "/"

// url para o mongo caso esteja a correr no docker ou local
var mongo = (process.argv[2] || '127.0.0.1:27017')

// Base de dados
var mongoose = require('mongoose')
const db = 'mongodb://' + mongo + '/phobiAR'
mongoose
    .connect(db, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log('DB Connection Error:' + err.message);
    });

// middleware
app.use(logger('dev'));

// app.listen(3112, () => {
//     console.log(`Server running at http://${app.address}:${app.port}/`);
// });

// Body parsers
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// tratar do cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, PATCH,OPTIONS');
    res.header('Access-Control-Allow-Credentials', true)
    next();
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/phobias', require('./routes/api/phobias'));
app.use('/api/markers', require('./routes/api/markers'));
app.use('/api/sessions', require('./routes/api/sessions'));
app.use('/api/feedback', require('./routes/api/feedback'));
app.use('/sessions', require('./routes/sessions'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;