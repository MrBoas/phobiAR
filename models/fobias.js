var mongoose = require("mongoose")
var Schema = mongoose.Schema

var FobiasSchema = new Schema({
    name: { type: String, required: true, unique: true },
})

module.exports = mongoose.model("Fobias", FobiasSchema, "fobias")