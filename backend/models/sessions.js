var mongoose = require("mongoose")
var Schema = mongoose.Schema


var SessionsSchema = new Schema({
    user: { type: String, required: true},
    session_name: { type: String, required: true },
    patient: { type: String, required: true },
    notes: { type: String},
    phobia: { type: String, required: true },
    model: { type: String, required: true },
    level: { type: String, required: true },
    marker: { type: String, required: true },

})

    SessionsSchema.index({
        session_name: 1,
        patient: 1,
    }, {
        unique: true,
    });

module.exports = mongoose.model("Sessions", SessionsSchema, "sessions")