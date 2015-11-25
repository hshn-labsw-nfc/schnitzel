var express = require('express');
var router = express.Router();

var Location = require('../models/location');
var Riddle = require('../models/riddle');
var Tag = require('../models/tag');
var PlaySession = require('../models/playSession');

router.post('/start', startPlaySession);
router.get('/state/:sessionid', getState);
router.post('/riddle/:sessionid', solveRiddle);
router.get('/location/:id', getLocation);

// Will return the sessionid of the playsession
function startPlaySession(req, res, next) {
    res.send('4635978');
}

// Will return the current state
//State: {
//    riddleToSolve: Does the nextRiddle to be solved before progress can be made?,
//    nextRiddle: {riddle: Question to solve, (... more stuff later: different riddletypes, etc.)},
//    nextLocation: Location-Description (?)
//}
function getState(req, res, next) {
    res.send({
        progress: {
            count: 10,
            done: 2
        },
        riddleSolved: false,
        riddle: {
            id: 43535,
            question: "Wer wie was?"
        }
    });
}

// Will return whether the sent solution was right
function solveRiddle(req, res, next) {
    res.send('This will be the route to send a riddlesolution to the server');
}

// Will return the location based on a tagid
function getLocation(req, res, next){

}

module.exports = router;