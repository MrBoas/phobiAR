var Marker = require("../models/markers")
const Markers = module.exports

// retorna a lista de marcadores
Markers.list = () => {
    return Marker
        .find()
        .sort({ marker: -1 })
        .exec()
}

// retorn as informações de um marcador
Markers.getMarker = marker => {
    return Marker
        .findOne({ marker: marker },{_id:0})
        .exec()
}

// retorn o path da imagem de um marcador
Markers.getMarkerImage = marker => {
    return Marker
        .findOne({ marker: marker },{image:1,_id:0})
        .exec()
}

// retorn o path do patt de um marcador
Markers.getMarkerPatt = marker => {
    return Marker
        .findOne({ marker: marker }, { patt: 1, _id: 0 })
        .exec()
}

// cria um marcador
Markers.createMarker = marker => {
    return Marker
        .create(marker)
}

//  apagar um marcador específico
Markers.deleteMarker = marker => {
    return Marker
        .findOneAndDelete({marker: marker })
        .exec()
}
