var express = require('express')
var router = express.Router()
var axios = require("axios")
// var path = require('path')



router.get('/', (req, res) => {
    axios.get(req.app.locals.url + "api/obras/")
        .then(lista => res.render("obras/obras", { lista: lista.data }))
        .catch(error => {
            console.log("Error while getting Obras: " + error)
            res.render("error", { message: "getting Obras", error: error })
        })
})