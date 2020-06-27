var express = require('express')
var router = express.Router()
var axios = require("axios")


// gera a sessão a partir de informação recebida
router.get('/:user/:phobia/:model/:level/:marker', (req, res) => {
    res.render('render_session', {
        src: '/models/' + req.params.phobia + '/' + req.params.model + '/' + req.params.level + '/scene.glb',
        url: '/markers/' + req.params.marker + '.patt'
    })
})

module.exports = router;
