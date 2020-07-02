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

// mostra  a lista de marcadores de um user
router.get('/:user', function (req, res) {
    markers.listMarkers(req.params.user)
        .then(data => {
            var result = data.map(function(obj) {
                return obj.marker
            })
            res.jsonp(result)
        })
        .catch(error => res.status(500).jsonp(error))
});

// mostra a informação de um marcador de um user
router.get('/:user/:marker', function (req, res) {
    markers.showMarker(req.params.user,req.params.marker)
        .then(data => {
            // var result = data.map(function (obj) {
            //     return obj.marker
            // })
            res.jsonp(data)
        })
        .catch(error => res.status(500).jsonp(error))
});

// faz download de um marcador especifico
// TODO o donwload n vai funcionar para os narcadores de niveis
router.get('/:user/:marker/download', (req, res) => {
    markers.getMarkerImage(req.params.user, req.params.marker)
        .then(data => {
            res.download(process.cwd() + "/public/markers/" + data.image, erro => {
                if (erro) console.log('erro:',erro)
                else console.log('Sent:', data.image)
            })
        })
        .catch(error => res.status(500).jsonp(error))
})

// // mostra as informações de um marcador
// router.get('/:marker', function (req, res) {
//     markers.getMarker(req.params.marker)
//         .then(data => res.jsonp(data))
//         .catch(error => res.status(500).jsonp(error))
// });

// // mostra o path da imagem de um marcador
// router.get('/:marker/image', function (req, res) {
//     markers.getMarkerImage(req.params.marker)
//         .then(data => res.jsonp(data.image))
//         .catch(error => res.status(500).jsonp(error))
// });

// // mostra o path do patt um marcador
// router.get('/:marker/patt', function (req, res) {
//     markers.getMarkerPatt(req.params.marker)
//         .then(data => res.jsonp(data.patt))
//         .catch(error => res.status(500).jsonp(error))
// });



// // fazer upload de um marcador
// router.post('/upload', (req, res) => {
//     var form = new formidable.IncomingForm()
//     var erro = ''
//     form.parse(req, (erro, fields, files) => {
//         var path_marker = '/files/markers/'
//         var fenviado_patt = files.patt.path
//         var fenviado_image = files.image.path
//         var fnovo_patt = process.cwd() + path_marker +  files.patt.name
//         var fnovo_image = process.cwd() + path_marker + files.image.name
//         var marker_name = fields.name
//         var image = path_marker + files.image.name
//         var patt = path_marker + files.patt.name
//         console.log(files)
//         // Adicionar o ficheiro carregado à pasta
//         fs.readFile(fenviado_patt, function (erro1, data) {
//             if (erro1) res.render('erro', { e: erro1 })
//             else {
//                 fs.writeFile(fnovo_patt, data, function (erro2) {
//                     if (erro2) erro += erro2
//                 })
//                 fs.unlink(fenviado_patt, function (erro3) {
//                     if (erro3) erro += erro3
//                 });
//                 if (erro) res.render('erro', { e: erro })
//                 else {
//                     fs.readFile(fenviado_image, function (erro4, data) {
//                         if (erro4) res.render('erro', { e: erro4})
//                         else {
//                             fs.writeFile(fnovo_image, data, function (erro5) {
//                                 if (erro5) erro += erro5
//                             })
//                             fs.unlink(fenviado_image, function (erro6) {
//                                 if (erro6) erro += erro6
//                             });
//                             if (erro) res.render('erro', { e: erro4 })
//                             else{
//                                 // adicionar o ficheiro á base de dados
//                                 var marker = { marker: marker_name, image: image, patt: patt }
//                                 markers.createMarker(marker)
//                                     .then(data => res.jsonp(data))
//                                     .catch(erro => res.status(500).jsonp(erro))
//                             }
//                         }
//                     })
//                 }
//             }
//         })
//     })
// })

// // apagar um marcador especifico
// router.delete('/delete/:marker',(req,res) =>{
//     markers.deleteMarker(req.params.marker)
//         .then(data =>
//             {fs.unlink(process.cwd() + data.patt, (error) => {
//                 if (error) {
//                     res.render('erro', { e: error })
//                     return
//                 }
//             })
//             fs.unlink(process.cwd() + data.image, (error) => {
//                 if (error) {
//                     res.render('erro', { e: error })
//                     return
//                 }
//             })
//             res.jsonp(data)
//         })
//         .catch(error => res.status(500).jsonp(error))
// })


module.exports = router;