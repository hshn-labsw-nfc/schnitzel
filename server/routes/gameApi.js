var express = require('express');
var router = express.Router();

var Location = require('../models/location');
var Riddle = require('../models/riddle');
var Tag = require('../models/tag');
var PlaySession = require('../models/playSession');

router.post('/playSession', startPlaySession);
router.delete('/playSession/:sessionid', deletePlaySession);
router.get('/state/:sessionid', getState);
router.post('/solve/:sessionid', solveRiddle);
router.get('/location/:id', getLocation);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function filterObject(obj, keys){
    var filteredObj = {};
    keys.forEach(function(key){
        filteredObj[key] = obj[key];
    });
    return filteredObj;
}

// Will return the sessionid of the playsession
function startPlaySession(req, res, next) {
    var playSession = new PlaySession();
    playSession.lastUpdated = new Date();
    playSession.riddleSolved = true;
    Location.find({'isActive': true}, function(err, locations){
        if(err){
            res.send(err);
            return;
        }
        playSession.locationID = locations[getRandomInt(0,locations.length)]._id;

        Riddle.find().exec(function(err, riddles){
            if(err){
                res.send(err);
                return;
            }

            playSession.riddleID = riddles[getRandomInt(0, locations.length)]._id;

            playSession.save(function(err, savedPlaySession){
                if(err){
                    res.send(err);
                    return;
                }
                res.send(savedPlaySession._id);
            });
        });
    });
}

function deletePlaySession(req, res, next){
    var id = req.params.id;
    PlaySession.remove({
        _id: id
    }, function (err, entry) {
        if (err) {
            res.send(err);
            return;
        }
        res.send({deleted: true});
    });
}

// Will return the current state
//State: {
//    riddleToSolve: Does the nextRiddle to be solved before progress can be made?,
//    nextRiddle: {riddle: Question to solve, (... more stuff later: different riddletypes, etc.)},
//    nextLocation: Location-Description (?)
//}
function getState(req, res, next) {
    var sessionID = req.params.sessionid;
    PlaySession.findById(sessionID, function(err, session){
        if(err){
            res.send(err);
            return;
        }
        console.log(session);
        var result = filterObject(session, ['riddleToSolve']);

        if(session.locationID){
            Location.findById(session.locationID, function(err, location){
                if(err){
                    res.send(err);
                    return;
                }
                result.location = filterObject(location, ['room', 'name']);
                if(session.riddleID){
                    Riddle.findById(session.riddleID, function(err, riddle){
                        if(err){
                            res.send(err);
                            return;
                        }
                        result.riddle = filterObject(riddle, ['name', 'description']);
                        res.send(result);
                    })
                }else{
                    res.send(result);
                }
            });
        }else{
            res.send(result);
        }
    });
    return;
    res.send({
        progress: {
            count: 10,
            done: 4
        },
        riddleSolved: false,
        riddle: {
            question: "Wer wie was?"
        },
        location: {
            _id: "5655bd825c01ac3816364652",
            isActive: true,
            __v: 0,
            category: "Allgemein",
            description: "dfgfdgfd",
            name: "fgdg",
            room: "fdgfdgfd"
        }
    });
}

// Will return whether the sent solution was right
function solveRiddle(req, res, next) {
    if(req.params.sessionid == 4635978 && req.body.answer == "so"){
        res.send({answerWasRight: true});
    }else{
        res.send({answerWasRight: false});
    }
}

// Will return the location based on a tagid
function getLocation(req, res, next){

}

module.exports = router;