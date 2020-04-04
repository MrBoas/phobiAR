var mongoose = require("mongoose")
var Schema = mongoose.Schema


var SessionsSchema = new Schema({
    user: { type: String, required: true},
    session: { type: String, required: true, unique: true },
    patient: { type: String, required: true },
    notes: { type: String},
    phobia: { type: String, required: true },
    model: { type: String, required: true },
    level: { type: String, required: true },
    marker: { type: String, required: true },

})


module.exports = mongoose.model("Sessions", SessionsSchema, "sessions")