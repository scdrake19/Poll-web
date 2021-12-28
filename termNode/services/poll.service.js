const db = require('../_helpers/database');
const mongoose = require('mongoose');
const Poll = db.Poll;
const User = db.User;

module.exports = {
    getAllPolls,
    addPoll,
    deletePoll,
    getPoll,
    updatePoll,
    getAllForUser,
    vote
}


//TODO: write the necessary functions that will address the needs of parecord.controller. Hint: look at the signatures in the module.exports. Hint2: look at user.service to see how you can interact with the database. Hint3: look at the class material.

async function getAllPolls (username) {

    let sendrecs = [];
    recs =  await Poll.find({});


    for (let i = 0; i < recs.length; i++) {
        //id = rec.createdBy: mongoose.Schema.Types.ObjectId;
        // console.log(recs[i]);
        user = await User.findById(recs[i].createdBy);
        //  change this

        let vote = false;
        for (let j = 0; j < recs[i].votedOn.length; j++)
        {
            if (recs[i].votedOn[j] == username)
            {
                vote = true;
            }
        }

        let ret = {
            question: recs[i].question,
            options: recs[i].options,
            votes: recs[i].totalCount,
            createdDate: recs[i].createdDate,
            createdBy: {
                username: user.username,
            },
            votedOn : vote,
            edited: recs[i].edited,
        };
        sendrecs.push(ret);

    }
    return sendrecs;
}




async function addPoll(poll, username) {


    // validate
    if (await Poll.findOne({ createdBy: username, createdDate: poll.createdDate  })) {
        throw 'Poll created by"' + poll.createdBy +" on "+ poll.createdDate +'" already exists';
    }
    else if(!username){
        throw 'Error with the user submitting the request. User information missing. Malformed request.';
    }
    //populate missing fields in the poll object
    poll.createdBy = username;
    // poll.createdDate =  Date.now();

    dbrecord = new Poll(poll);


    // save the record
    await dbrecord.save();
    return 'Recorded!'
}

async function deletePoll(date, username) {

    if (await Poll.findOne({createdBy: username, createdDate: date}))
    {
        await Poll.deleteOne({ createdBy: username, createdDate: date});
        return 'Deleted:1';
    }
    else {
        return 'Deleted:0';
    }

}


async function getPoll(date, username) {
    const rec = await Poll.findOne({createdBy: username, createdDate: date});
    const user = await User.findById(username);

    if (rec != null && user != null) {
        let vote = false;
        for (let j = 0; j < rec.votedOn.length; j++)
        {
            if (rec.votedOn[j] === user._id)
            {
                vote = true;
            }
        }

        return ret = {
            question: rec.question,
            options: rec.options,
            votes: rec.totalCount,
            createdBy: {
                username: user.username,
            },
            votedOn : vote,
        }
    }
    else {
        return'No such record';
    }
}

// need to change this one
async function updatePoll(poll, username) {
    console.log(poll);
    let resp = await Poll.updateOne({createdBy: username, createdDate: poll.createdDate},
        {$set: {"question": poll.question,
                "options": poll.options, "totalCount": poll.totalCount, "edited": true}});
    console.log(resp);
    return "record updated";
}

// gets all methods for all polls for a specific user, used for the "my polls page "
async function getAllForUser(username) {
    let sendrecs = [];
    let recs =  await Poll.find({createdBy: username});

    for (let i = 0; i < recs.length; i++) {
        //id = rec.createdBy: mongoose.Schema.Types.ObjectId;
        // console.log(recs[i]);
        user = await User.findById(recs[i].createdBy);
        //  change this
        let vote = false;
        for (let j = 0; j < recs[i].votedOn.length; j++)
        {
            if (recs[i].votedOn[j] == username)
            {
                vote = true;
            }
        }
        let ret = {
            question: recs[i].question,
            options: recs[i].options,
            votes: recs[i].totalCount,
            createdDate: recs[i].createdDate,
            createdBy: {
                username: user.username,
            },
            votedOn : vote,
            edited: recs[i].edited,
        };

        sendrecs.push(ret);
    }

    return sendrecs;
}

// increments count of option
async function vote(vals, username) {

    let use = await User.findOne({username: vals.poll.createdBy.username});

    let poll = await Poll.findOne({createdBy: use._id, createdDate: vals.poll.createdDate});

    for (let i = 0; i < poll.options.length; i++) {
        if (poll.options[i].option == vals.option.option && vals.option.count == poll.options[i].count) {
            await Poll.updateOne({'options.option': vals.option.option}, {'$set': {'options.$.count': vals.option.count + 1}});
            await Poll.updateOne({_id: poll._id}, {'$set': {'totalCount': poll.totalCount + 1}});
            await Poll.updateOne({_id: poll._id}, {'$push': {'votedOn': username}});
            return 'Voted';
        }
    }
    return 'error';
}
