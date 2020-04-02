var mongoose = require("mongoose")
var Schema = mongoose.Schema

var MarkersSchema = new Schema({
    marker: { type: String, required: true, unique: true },
    image: { type: String},
    patt: { type: String, required: true},
})

module.exports = mongoose.model("Markers", MarkersSchema, "markers")