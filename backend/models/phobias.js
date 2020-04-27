var mongoose = require("mongoose")
var Schema = mongoose.Schema


var PhobiasSchema = new Schema({
    name: { type: String, required: true },
    user: { type: String, required: true},
    models: [{
        model_name: {type:String,required: true},
        levels: [Number]
    }]
})

    PhobiasSchema.index({
        name: 1,
        user: 1,
    }, {
        unique: true,
    });


module.exports = mongoose.model("Phobias", PhobiasSchema, "phobias")