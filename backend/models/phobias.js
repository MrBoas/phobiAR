var mongoose = require("mongoose")
var Schema = mongoose.Schema


var PhobiasSchema = new Schema({
    name: { type: String, required: true },
    user: { type: String, required: true, unique:true },
    models: [{
        model_name: {type:String,required: true},
        levels: [Number]
    }]

})


module.exports = mongoose.model("Phobias", PhobiasSchema, "phobias")