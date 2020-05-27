var express = require('express');
var router = express.Router();
var Feedbacks = require("../../controllers/feedback")


router.get('/', function (req, res) {
  Feedbacks.list()
    .then(data => res.jsonp(data))
    .catch(error => res.status(500).jsonp(error))
});

router.post('/', function (req, res) {
  console.log(">> feedback: " + req.body)
  Feedbacks.create(req.body)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
});


module.exports = router;