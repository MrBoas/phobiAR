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
Phobias.UserPhobias = user => {
    return Phobia
        .find({ user: user }, { _id: 0 })
        .sort({ phobia: 1 })
        .exec()
}

// retorna a lista de fobias de um user
Phobias.listUser = user => {
    return Phobia
        .aggregate([
            {$match: {user:user}},
            { $sort: { 'phobia': 1 } },
            {$group:{
                _id:'user',
                list:{$push: '$phobia'},
            }},
            {$project:{'_id':0,'list':1}}
        ])
}

// retorna a lista de modelos de um fobia de um user
Phobias.getPhobiaModels = (user,phobia) => {
    return Phobia
        .aggregate([
            { $match: { user: user,phobia:phobia } },
            { $unwind: '$models' },
            {
                $group: {
                    _id: 'user',
                    list: { $push: '$models.model_name' },
                }
            },
            { $project: { '_id': 0, 'list': 1 } }
        ])
}

Phobias.getModelLevels = (user, phobia,model) => {
    return Phobia
        .aggregate([
            { $unwind: '$models' },
            { $unwind: '$models.levels' },
            { $match: { user: user, phobia: phobia, "models.model_name": model} },
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
