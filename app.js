const express = require('express');
var createError = require('http-errors');
const app = express();
var path = require('path');
app.set('view engine', 'pug');

// app.set('view engine', 'html');
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

const hostname = '127.0.0.1';
const port = 3000;


// Base de dados
var mongoose = require('mongoose')
const dbLocal = 'mongodb://127.0.0.1:27017/phobiAR'
mongoose
    .connect(dbLocal, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log('DB Connection Error: ${ err.message }');
    });

app.listen(3000, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
    // console.log(__dirname)
    // res.sendFile(path.join(__dirname + '/files/testing.html'));
    res.sendFile('files/testing.html',{root:__dirname});
    // res.render('testing')
});

app.get('/pug', function(req,res){
    res.render('testing')
})

// Routing
app.use('/api/phobias', require('./routes/api/phobias'));
app.use('/api/markers', require('./routes/api/markers'));
app.use('/api/sessions', require('./routes/api/sessions'));



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