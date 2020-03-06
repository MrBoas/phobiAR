var Marker = require("../models/markers")
const Markers = module.exports

Markers.list = () => {
    return Marker
        .find({}, { _id: 0 })
        .sort({ name: -1 })
        .exec()
}

Markers.getMarker = name => {
    return Marker
        .findOne({ name: name },{_id:0})
        .exec()
}

Markers.getMarkerImage = name => {
    return Marker
        .findOne({ name: name },{image:1,_id:0})
        .exec()
}