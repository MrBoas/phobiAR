var mongoose = require("mongoose")
var Schema = mongoose.Schema

var MarkersSchema = new Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true},
    file: { type: String, required: true},
})

module.exports = mongoose.model("Markers", MarkersSchema, "markers")