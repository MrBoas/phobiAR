var Marker = require("../models/markers")
const Markers = module.exports

Markers.list = () => {
    return Marker
        .find()
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

Markers.createMarker = marker => {
    return Marker
        .create(marker)
}

Markers.deleteMarker = id => {
    return Marker
        .findOneAndDelete({ _id: id })
        .exec()
}
