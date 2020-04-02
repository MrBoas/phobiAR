var express = require('express')
var router = express.Router()
var axios = require("axios")


// gera a sessão a partir de informação recebida
router.get('/:user/:phobia/:model/:level/:marker', (req, res) => {
    res.render('testing', {
        src: '/models/' + req.params.phobia + '/' + req.params.model + '/' + req.params.level + '/scene.gltf',
        url: '/markers/' + req.params.marker + '.patt'
    })
})

// gera a sessão a partir da informação de uma sessão
router.get('/:user/:session', (req, res) => {
    var axios_url = req.app.locals.url + "api/sessions/" + req.params.user + "/" + req.params.session + '/infogerarsessao'
    axios.get(axios_url)
        .then(response => {
            var info_sessao = response.data[0]
            res.render('testing',{
                src: '/models/'+info_sessao.phobia+'/'+info_sessao.model+'/'+info_sessao.level+'/scene.gltf',
                url: '/markers/'+info_sessao.marker+'.patt'
        })})
        .catch(error => {
            console.log( ""+ error)
            res.render('error');
        })
})


module.exports = router;
