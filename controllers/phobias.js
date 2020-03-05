var Phobia = require("../models/phobias")
const Phobias = module.exports

Phobias.list = () => {
    return Phobia
        .find({},{_id: 0})
        .sort({ name: -1 })
        .exec()
}
