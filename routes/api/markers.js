var express = require('express');
var router = express.Router();
var markers = require("../../controllers/markers")

router.get('/', function (req, res) {
    markers.list()
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});


module.exports = router;