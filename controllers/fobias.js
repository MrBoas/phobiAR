var Fobia = require("../models/fobias")
const Fobias = module.exports

Fobias.list = () => {
    return Fobia
        .find()
        .sort({ name: -1 })
        .exec()
}
