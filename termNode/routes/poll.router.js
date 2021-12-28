const express = require('express');
const router = express.Router();


const authorize = require('../_helpers/authorize');
const pollController = require("../controllers/poll.controller");


router.post('/addPoll', pollController.createPoll);
router.get('/getPolls', pollController.getAllPolls);
router.delete('/:date', pollController.deletePoll);
router.get('/create/:date', pollController.getPoll);
router.post('/set', pollController.updatePoll);
router.get('/get4User', pollController.getUserPolls);
router.post('/vote', pollController.vote);
module.exports = router;
