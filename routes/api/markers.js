var express = require('express');
var formidable = require('formidable')
var fs = require('fs')
var router = express.Router();
var markers = require("../../controllers/markers")

const dbLocal = 'mongodb://127.0.0.1:27017/phobiAR'

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
    var error = ''
    form.parse(req, (erro, fields, files) => {
        var path_marker = '/files/markers/'
        var fenviado_patt = files.patt.path
        var fenviado_image = files.image.path
        var fnovo_patt = process.cwd() + path_marker +  files.patt.name
        var fnovo_image = process.cwd() + path_marker + files.image.name
        var name = fields.name
        var image = path_marker + files.image.name
        var patt = path_marker + files.patt.name

        // Adicionar o ficheiro carregado à pasta
        fs.readFile(fenviado_patt, function (erro1, data) {
            if (erro1) console.log('erro:',erro)
            else {
                fs.writeFile(fnovo_patt, data, function (erro2) {
                    if (erro2) error += erro2
                })
                fs.unlink(fenviado_patt, function (erro3) {
                    if (erro3) error += erro3
                });
                if (error) console.log('erro:', erro)
            }
        })
        fs.readFile(fenviado_image, function (erro1, data) {
            if (erro1) console.log('erro:', erro)
            else {
                fs.writeFile(fnovo_image, data, function (erro4) {
                    if (erro4) error += erro4
                })
                fs.unlink(fenviado_image, function (erro5) {
                    if (erro5) error += erro5
                });
                if (error) console.log('erro:', erro)
            }
        })
        // adicionar o ficheiro á base de dados
        var marker = { name: name, image: image, patt: patt }
        markers.createMarker(marker)
            .then(data => res.jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    })
})


module.exports = router;