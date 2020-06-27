var express = require('express');
var formidable = require('formidable')
var router = express.Router();
var sessions = require("../../controllers/sessions")

// retorna a lista de todas as sessões
router.get('/', function (req, res) {
    sessions.list()
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

// retorna a lista informações das sessoes de um user
router.get('/:user', function (req, res) {
    sessions.listUserSessions(req.params.user)
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

// fazer upload de um sessão
router.post('/:user/upload', (req, res) => {
    var form = new formidable.IncomingForm()
    form.parse(req, (erro, fields, files) => {
      var session = {
        user: req.params.user,
        session_date: fields.session_date,
        patient: fields.patient,
        notes: fields.notes,
        phobia: fields.phobia,
        model: fields.model,
        level: fields.level,
        marker: fields.marker
      }
        sessions.createSession(session)
            .then(data => res.jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    })
})

// apaga uma sessão de um user
router.delete('/:user/:session_date/:patient',(req,res)=>{
  sessions.deleteSession(req.params.user, req.params.session_date, req.params.patient)
        .then(data => { res.jsonp(data)})
        .catch(error => res.status(500).jsonp(error))
})

// altera as informações de uma sessão de um user
router.put('/:user/:session_date/:patient',(req,res)=>{
  var form = new formidable.IncomingForm()
  form.parse(req, (erro, fields, files) => {
    var session_date = fields.session_date
    var patient = fields.patient
    var notes = fields.notes
    var phobia = fields.phobia
    var model = fields.model
    var level = fields.level
    var marker = fields.marker
    var sessionInfo = { user: req.params.user, session_date: session_date, patient: patient, notes: notes, phobia: phobia, model: model, level: level, marker: marker }

    sessions.updateSession(req.params.user, req.params.session_date, req.params.patient ,sessionInfo)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
    })
})

module.exports = router;