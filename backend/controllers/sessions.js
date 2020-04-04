var Session = require("../models/sessions")
const Sessions = module.exports

// retorna a lista das sessoes
Sessions.list = () => {
    return Session
        .find()
        .sort({ session: -1 })
        .exec()
}

// retorna a lista informações das sessoes de um user
Sessions.listUserSessions = user => {
    return Session
        .find({ user: user }, {_id: 0 })
        .sort({ session: 1 })
        .exec()
}

// retorna a informação de uma determinada sessão
Sessions.sessionInfo = (user, session) => {
    return Session
        .find({ user: user, session: session }, { _id: 0, __v:0 })
        .sort({ session: 1 })
        .exec()
}

// retorna a lista informações das sessoes de um user
Sessions.genSessionInfo = (user,session) => {
    return Session
        .find({ user: user,session:session }, { phobia:1,model:1,level:1,marker:1,_id: 0 })
        .sort({ session: 1 })
        .exec()
}

// cria uma sessão
Sessions.createSession = session => {
    return Session
        .create(session)
}

// apaga uma sessão
Sessions.deleteSession = (user,session) =>{
    return Session
        .findOneAndDelete({user:user,session:session})
        .exec()
}