var Marker = require("../models/markers")
const Markers = module.exports

// retorna a lista de marcadores
Markers.list = () => {
    return Marker
        .find()
        .sort({ name: -1 })
        .exec()
}

// retorn as informações de um marcador
Markers.getMarker = name => {
    return Marker
        .findOne({ name: name },{_id:0})
        .exec()
}

// retorn o path da imagem de um marcador
Markers.getMarkerImage = name => {
    return Marker
        .findOne({ name: name },{image:1,_id:0})
        .exec()
}

// retorn o path do patt de um marcador
Markers.getMarkerPatt = name => {
    return Marker
        .findOne({ name: name }, { patt: 1, _id: 0 })
        .exec()
}

// cria um marcador
Markers.createMarker = marker => {
    return Marker
        .create(marker)
}

//  apagar um marcador específico
Markers.deleteMarker = name => {
    return Marker
        .findOneAndDelete({name: name })
        .exec()
}
