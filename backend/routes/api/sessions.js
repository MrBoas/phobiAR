var express = require('express');
var formidable = require('formidable')
var fs = require('fs')
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

// retorna a informação de uma determinada sessão
router.get('/:user/:session', function (req, res) {
    sessions.sessionInfo(req.params.user, req.params.session)
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

// retorna a informação necessária para gerar uma sessão
router.get('/:user/:session/infogerarsessao', function (req, res) {
    sessions.genSessionInfo(req.params.user,req.params.session)
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).jsonp(error))
});

// fazer upload de um sessão
router.post('/:user/uploadsession', (req, res) => {
    var form = new formidable.IncomingForm()
    form.parse(req, (erro, fields, files) => {
        var session = fields.session
        var patient = fields.patient
        var notes = fields.notes
        var phobia = fields.phobia
        var model = fields.model
        var level = fields.level
        var marker = fields.marker

        var session = {user:req.params.user,session:session,patient:patient,notes:notes,phobia:phobia,model:model,level:level,marker:marker}
        sessions.createSession(session)
            .then(data => res.jsonp(data))
            .catch(error => res.status(500).jsonp(error))
    })
})

module.exports = router;