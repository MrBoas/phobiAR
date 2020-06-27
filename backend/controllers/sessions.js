var Session = require("../models/sessions")
const Sessions = module.exports

// retorna a lista das sessoes
Sessions.list = () => {
    return Session
        .find()
        .exec()
}

// retorna a lista informações das sessoes de um user
Sessions.listUserSessions = user => {
    return Session
        .find({ user: user }, {_id:0})
        .sort({ patient: 1 })
        .exec()
}


// cria uma sessão
Sessions.createSession = session => {
    return Session
        .create(session)
}

// atualiza os valores de uma sessão
Sessions.updateSession = (user, session_name, patient, sessionInfo) => {
    return Session
        .findOneAndUpdate({ user: user, session_name: session_name, patient:patient }, sessionInfo, { useFindAndModify: false })
        .exec()
}

// apaga uma sessão
Sessions.deleteSession = (user, session_name,patient) =>{
    return Session
        .findOneAndDelete({ user: user, session_name: session_name,patient:patient})
        .exec()
}