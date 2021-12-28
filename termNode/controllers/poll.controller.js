const pollService = require("../services/poll.service")
module.exports = {
    createPoll,
    getAllPolls,
    deletePoll,
    getPoll,
    updatePoll,
    getUserPolls,
    vote
};


function createPoll(req, res, next) {
    // console.log(req);
    //TODO: via parecordSerice you should add a PA record and respond to the client confirming that the record was successfully added.
    pollService.addPoll(req.body, req.user.sub)
        .then(mess => res.json(mess))
        .catch(err => next(err));

}

function getAllPolls(req,res,next){
//TODO: return all parecords from the database and send to the client.
    pollService.getAllPolls(req.user.sub)
        .then(recs =>
            res.json(recs))
        .catch(err => next(err));
}


function deletePoll(req,res,next){

//TODO: delete parecord from the database and respond to the client by conforming the action.
    pollService.deletePoll(req.params.date, req.user.sub)
        .then(mess => res.json(mess))
        .catch(err => next(err));
}


function getPoll(req, res, next) {
    pollService.getPoll(req.params.date, req.user.sub)
        .then(rec => res.json(rec))
        .catch(err => next(err));
}

function updatePoll(req, res, next) {
    pollService.updatePoll(req.body, req.user.sub)
        .then(mess => res.json(mess))
        .catch(err => next(err));
}


function getUserPolls(req, res, next) {
    pollService.getAllForUser(req.user.sub)
        .then(pols => res.json(pols))
        .catch(err => next(err));
}


function vote(req,res,next) {
    pollService.vote(req.body, req.user.sub)
        .then(mess => res.json(mess))
        .catch(err => next(err));
}
