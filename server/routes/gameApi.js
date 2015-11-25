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
    advanceState(playSession, res, function(savedPlaySession){

        res.send(savedPlaySession._id);
    });
}

function advanceState(playSession, res, callback){
    playSession.lastUpdated = new Date();
    playSession.riddleSolved = true;
    if(playSession.locationID){
        playSession.locationsVisited.push(playSession.locationID);
    }
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
                if(callback){
                    callback(savedPlaySession);
                }
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
        var result = filterObject(session, ['riddleSolved']);

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
}

// Will return whether the sent solution was right
function solveRiddle(req, res, next) {
    var sessionID = req.params.sessionid;
    var answer = req.body.answer;
    PlaySession.findById(sessionID, function(err, session) {
        if (err) {
            res.send(err);
            return;
        }

        Riddle.findById(session.riddleID, function(err, riddle){
            if (err) {
                res.send(err);
                return;
            }
            if(riddle.answer == answer){
                advanceState(session, res, function(){
                    res.send({answerWasRight: true});
                });
            }else{
                res.send({answerWasRight: false});
            }
        });
    });
}

// Will return the location based on a tagid
function getLocation(req, res, next){

}

module.exports = router;