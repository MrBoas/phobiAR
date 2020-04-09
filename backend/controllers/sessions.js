var Session = require("../models/sessions")
const Sessions = module.exports

// retorna a lista das sessoes
Sessions.list = () => {
    return Session
        .find()
        .sort({ session_name: -1 })
        .exec()
}

// retorna a lista informações das sessoes de um user
Sessions.listUserSessions = user => {
    return Session
        .find({ user: user }, {_id:0})
        .sort({ patient: 1 })
        .exec()
}

// retorna a informação de uma determinada sessão
Sessions.sessionInfo = (user, session_name) => {
    return Session
        .find({ user: user, session_name: session_name }, { _id: 0, __v:0 })
        .sort({ session_name: 1 })
        .exec()
}

// retorna a lista informações das sessoes de um user
Sessions.genSessionInfo = (user, session_name) => {
    return Session
        .find({ user: user, session_name: session_name }, { phobia:1,model:1,level:1,marker:1,_id: 0 })
        .sort({ session_name: 1 })
        .exec()
}

// // retorna a lista de pacientes de um user
// Sessions.getUserPatients = (user) => {
//     return Session
//         .find({ user: user}, { patient: 1, _id: 0 })
//         .exec()
// }

// // retorna a lista de pacientes distintos de um user
// Sessions.getUserPatientsDistinct = (user) => {
//     return SessionupdateSession
//         .distinct("patient",{user:user})
//         .exec()
// }

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