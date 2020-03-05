var express = require('express');
var router = express.Router();
var phobias = require("../../controllers/phobias")

router.get('/', function (req, res) {
    phobias.list()
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});


module.exports = router;