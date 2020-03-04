// var http = require('http');
const express = require('express');
const app = express();
app.set('view engine', 'pug');

const hostname = '127.0.0.1';
const port = 3000;


// Base de dados
var mongoose = require('mongoose')
const dbLocal = 'mongodb://127.0.0.1:27017/phobiAR'
mongoose.connect(dbLocal, { useNewUrlParser: true })
    .then(() => console.log('Mongo running... status: ' + mongoose.connection.readyState))
    .catch(() => console.log('Mongo: erro na conexao!!!'))


const server = app.listen(3000, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

var fobias = ['aranhas', 'cobras','seringas','sangue'];

app.get('/fobias', (req, res) => {
    res.render('index',{
        fobias: fobias
    })
});

// buscar fobias a base de dados
app.get('/api/fobias', (req, res) => {
    res.jsonp(fobias)
});