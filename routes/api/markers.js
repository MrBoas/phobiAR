var express = require('express');
var formidable = require('formidable')
var fs = require('fs')
var router = express.Router();
var markers = require("../../controllers/markers")

router.get('/', function (req, res) {
    markers.list()
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

// mostra as informações de um marcador
router.get('/:name', function (req, res) {
    markers.getMarker(req.params.name)
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

// mostra o path de um marcador
router.get('/:name/image', function (req, res) {
    markers.getMarkerImage(req.params.name)
        .then(data => res.jsonp(data.image))
        .catch(error => res.status(500).jsonp(error))
});

// faz download de um marcador especifico
router.get('/:name/download', (req, res) => {
    markers.getMarkerImage(req.params.name)
        .then(data =>
            res.download(process.cwd() + data.image, erro => {
                if (erro) console.log('erro:',erro)
                else console.log('Sent:', data.image)
            }))
        .catch(error => res.status(500).jsonp(error))
})

// fazer upload de um ficheiro
router.post('/upload', (req, res) => {
    var form = new formidable.IncomingForm()
    form.parse(req, (erro, fields, files) => {

        // res.end(JSON.stringify({ fields, files }, null, 2));

        var path_marker = '/files/markers/'

        var fenviado = files.file.path
        var fnovo = process.cwd() + path_marker +  files.file.name
        var fileName = files.file.name
        var patt = path_marker + files.file.name
        var name = fields.name
        // console.log('fenviado', fenviado)
        // console.log('fnovo',fnovo)
        // console.log('name', name)
        // console.log('filename', fileName)
        // console.log('patt', patt)

        // var json = JSON.parse('{"ficheiro":"' + fileName + '","descricao":"' + descricao + '"}')
        var error = ''

        // Adicionar o ficheiro carregado á pasta
        fs.readFile(fenviado, function (erro1, data) {
            if (erro1) console.log('erro:',erro)
            else {
                fs.writeFile(fnovo, data, function (erro2) {
                    if (erro2) error += erro2
                })
                fs.unlink(fenviado, function (erro3) {
                    if (erro3) error += erro3
                });
                // if (error) res.render('erro', { e: error })
                // else {
                //     // Adicionar o ficheiro carregado a lista em JSON
                //     jsonfile.readFile(myBD, (erro4, ficheiros) => {
                //         if (erro4) error += erro4
                //         else {
                //             ficheiros.push(json)
                //             jsonfile.writeFile(myBD, ficheiros, erro5 => {
                //                 if (erro5) error += erro5
                //                 else {
                //                     if (error) res.render('erro', { e: error })
                //                     else res.redirect('/')
                //                 }
                //             })
                //         }
                //     })
                // }
            }

        })
    })
})


module.exports = router;