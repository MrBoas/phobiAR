var express = require('express');
var router = express.Router();
var phobias = require("../../controllers/phobias")

router.get('/', function (req, res) {
    phobias.list()
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

// retorna a lista de fobias de um user
router.get('/:user', function (req, res) {
    phobias.listUser(req.params.user)
        .then(data => res.jsonp(data[0].list))
        .catch(error => res.status(500).jsonp(error))
});

// mostra o nome de todos os modelos de uma fobia de um user
router.get('/:user/:phobia', function (req, res) {
    phobias.getPhobiaModels(req.params.user,req.params.phobia)
        .then(data => res.jsonp(data[0].list))
        .catch(error => res.status(500).jsonp(error))
});

// mostra o niveis disponiveis de um modelos de uma fobia de um user
router.get('/:user/:phobia/:model', function (req, res) {
    phobias.getModelLevels(req.params.user, req.params.phobia,req.params.model)
        .then(data => res.jsonp(data[0].list))
        .catch(error => res.status(500).jsonp(error))
});


module.exports = router;