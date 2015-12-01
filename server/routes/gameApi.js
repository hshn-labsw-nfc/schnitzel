var express = require('express');
var router = express.Router();

var Location = require('../models/location');
var Riddle = require('../models/riddle');
var Tag = require('../models/tag');
var PlaySession = require('../models/playSession');
var ResponseHandler = require('../util/responsehandler.js');

router.post('/playsession', startPlaySession);
router.delete('/playsession/:sessionid', deletePlaySession);
router.get('/state/:sessionid', getState);
router.post('/solve/:sessionid', solveRiddle);
router.post('/location/:sessionid', checkLocation);

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
    playSession.task = 'findLocation';


    Riddle.find().exec(function(err, riddles){
        var handler = new ResponseHandler(res);
        if(err){
            handler.error(err);
            return;
        }
        if(riddles.length == 0){
            handler.error(new Error('no Riddles in database'));
            return;
        }
        playSession.riddleID = riddles[getRandomInt(0, riddles.length)]._id;

        if(!playSession.locationCount){
            Location.find({'isActive': true}, function(err, locations){
                if(err){
                    handler.error(err);
                    return;
                }
                playSession.locationCount = locations.length;
                playSession.locationsToVisit = locations.map(function(location){
                    return location._id;
                });
                _finishAdvanceState(playSession, callback);
            });

        }else{
            _finishAdvanceState(playSession, callback);
        }


    });
}

function _finishAdvanceState(playSession, callback){
    if(playSession.locationsToVisit.length == 0){
        playSession.task = 'won';
    }else{
        playSession.locationID = playSession.locationsToVisit.splice(getRandomInt(0,playSession.locationsToVisit.length), 1);
    }
    console.log(playSession.locationID);
    playSession.save(function(err, savedPlaySession){
        if(err){
            res.send(err);
            return;
        }
        if(callback){
            callback(savedPlaySession);
        }
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
    var handler = new ResponseHandler(res);
    var sessionID = req.params.sessionid;
    PlaySession.findById(sessionID, function(err, session){
        if(err){
            handler.error(err);
            return;
        }
        console.log(session);
        var result = {
            task: session.task,
            progress: {
                count : session.locationCount,
                done: session.locationCount - session.locationsToVisit.length - (session.task=='findLocation'? 1: 0)
            }
        };

        if(session.locationID){
            Location.findById(session.locationID, function(err, location){
                if(err){
                    handler.error(err);
                    return;
                }
                result.location = filterObject(location, ['room', 'name']);
                if(session.riddleID){
                    Riddle.findById(session.riddleID, function(err, riddle){
                        if(err){
                            handler.error(err);
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
                    res.send({correctAnswer: true});
                });
            }else{
                res.send({correctAnswer: false});
            }
        });
    });
}

// Will check if the location is right. if it is, will allow to solve riddle
function checkLocation(req, res, next){
    var sessionID = req.params.sessionid;
    var tagID = req.body.tagID;
    PlaySession.findById(sessionID, function(err, session){
       if(err){
           res.send(err);
           return;
       }

        Tag.findOne({'tagID': tagID}, function(err, tag){
            console.log(arguments);
            if(err){
                res.send(err);
                return;
            }
            if(!session || !tag){
                res.send({'ERROR': 'Please check your parameters :/'});
                return;
            }
            if(session.locationID == tag.locationID){

                // Correct locaction, lets update the session then
                session.task = 'solveRiddle';
                session.save(function(){
                    if(err){
                        res.send(err);
                        return;
                    }

                    res.send({correctLocation: true});
                });
            }else{
                res.send({correctLocation: false});
            }
        });
    });
}

module.exports = router;