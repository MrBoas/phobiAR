var express = require('express')
var router = express.Router()
var axios = require("axios")


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
