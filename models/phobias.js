var mongoose = require("mongoose")
var Schema = mongoose.Schema

var PhobiasSchema = new Schema({
    name: { type: String, required: true, unique: true },
})

module.exports = mongoose.model("Phobias", PhobiasSchema, "phobias")