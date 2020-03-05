var Marker = require("../models/markers")
const Markers = module.exports

Markers.list = () => {
    return Marker
        .find({}, { _id: 0 })
        .sort({ name: -1 })
        .exec()
}
