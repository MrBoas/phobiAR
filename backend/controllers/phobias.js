var Phobia = require("../models/phobias")
const Phobias = module.exports

// retorna a lista de fobias
Phobias.list = () => {
    return Phobia
        .find()
        .sort({ phobia: -1 })
        .exec()
}

// retorna a lista de fobias de um user
Phobias.listUser = user => {
    return Phobia
        .find({ user: user }, { phobia: 1, _id: 0 })
        .sort({ phobia: 1 })
        .exec()
}

// mostra o nome de todos os modelos de uma fobia de um user
Phobias.getPhobiaModels = (user,phobia) => {
    return Phobia
        .aggregate([
            { $unwind: '$models' },
            { $match: { user:user,phobia:phobia}},
            { $group:{
                _id: 'user',
                list: {$push: '$models.object_name'}
            }},
            { $project: { '_id': 0, 'list': 1 } }
        ])
        .exec()
}


// mostra o nome de todos os modelos de uma fobia de um user
Phobias.getModelLevels = (user, phobia,model) => {
    return Phobia
        .aggregate([
            { $unwind: '$models' },
            { $unwind: '$models.levels' },
            { $match: { user: user, phobia: phobia, "models.object_name": model} },
            {
                $group: {
                    _id: 'user',
                    list: { $push: '$models.levels' }
                }
            },
            { $project: { '_id': 0, 'list': 1 } }
        ])
        .exec()
}

// // cria um marcador
// Markers.createMarker = marker => {
//     return Marker
//         .create(marker)
// }

// //  apagar um marcador específico
// Markers.deleteMarker = marker => {
//     return Marker
//         .findOneAndDelete({ marker: marker })
//         .exec()
// }
