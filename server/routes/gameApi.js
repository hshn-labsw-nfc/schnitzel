var express = require('express');
var router = express.Router();

var Location = require('../models/location');
var Riddle = require('../models/riddle');
var Tag = require('../models/tag');
var PlaySession = require('../models/playSession');
var Config = require('../models/config');

var ResponseHandler = require('../util/responsehandler.js');

router.post('/sessions', startPlaySession);
router.delete('/sessions/:sessionid', deletePlaySession);
router.get('/sessions/:sessionid', getState);
router.post('/sessions/:sessionid/riddle', solveRiddle);
router.post('/sessions/:sessionid/location', checkLocation);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getAndRemoveRandomElement(arr) {
    return arr.splice(getRandomInt(0, arr.length), 1)[0];
}

function filterObject(obj, keys) {
    var filteredObj = {};
    keys.forEach(function (key) {
        filteredObj[key] = obj[key];
    });
    return filteredObj;
}

// Will return the sessionid of the playsession
function startPlaySession(req, res, next) {
    var groupName = req.body.groupName;
    var playSession = new PlaySession();
    playSession.groupName = groupName;
    advanceState(playSession, res, function (savedPlaySession) {
        res.send(savedPlaySession._id);
    });
}

function advanceState(playSession, res, callback) {
    var handler = new ResponseHandler(res);
    playSession.lastUpdated = new Date();
    playSession.task = 'findLocation';


    Location.find({'isActive': true}, function (err, locations) {
        if (err) {
            handler.error(err);
            return;
        }

        if (!playSession.locationCount) {
            playSession.locationCount = locations.length;
            playSession.locationsToVisit = locations.map(function (location) {
                return location._id;
            });
        }

        if (playSession.locationsToVisit.length == 0) {
            playSession.task = 'won';
            _finishAdvanceState(playSession, res, callback);
        } else {
            _getLocationID(playSession, locations, function (res) {
                playSession.locationID = res;
                _finishAdvanceState(playSession, res, callback);
            });
        }
    });
}

function _getLocationID(session, locations, callback) {

    var objLocationsToVisit = locations.filter(function (location) {
        return session.locationsToVisit.indexOf(location._id) != -1;
    });

    var result = objLocationsToVisit.sort(function () {
        return Math.random();
    }).sort(function (a, b) {
        return a.heat - b.heat;
    })[0];

    session.locationsToVisit.splice(session.locationsToVisit.indexOf(result._id), 1);

    updateHeat(result, 1, function () {
        callback(result._id);
    })
}

function _saveState(playSession, res, callback) {
    playSession.save(function (err, savedPlaySession) {
        if (err) {
            res.send(err);
            return;
        }
        if (callback) {
            callback(savedPlaySession);
        }
    });
}
function _finishAdvanceState(playSession, res, callback) {
    var handler = new ResponseHandler(res);

    if (playSession.task != 'won') {
        Riddle.find().exec(function (err, riddles) {
            if (err) {

                handler.error(err);
                return;
            }
            if (!riddles || riddles.length == 0) {
                handler.error(new Error('no Riddles in database'));
                return;
            }
            playSession.riddleID = _getRiddleID(playSession, riddles);
            playSession.usedRiddles.push(playSession.riddleID);


            _saveState(playSession, res, callback);
        });
    } else {
        _saveState(playSession, res, callback);
    }

}

function _getRiddleID(session, riddles) {

    var unusedRiddles = riddles.filter(function (riddle) {
        return session.usedRiddles.indexOf(riddle._id) == -1;
    });

    var nonLocationRiddles = unusedRiddles.filter(function (riddle) {
        return (riddle.locationID == undefined || riddle.locationID == null || riddle.locationID == '');
    });

    var locationRiddles = unusedRiddles.filter(function (riddle) {
        return riddle.locationID == session.locationID;
    });

    if (locationRiddles.length > 0) {
        return getAndRemoveRandomElement(locationRiddles)._id;
    }
    return getAndRemoveRandomElement(nonLocationRiddles)._id;
}

function deletePlaySession(req, res, next) {
    var id = req.params.sessionid;

    destroySession(id, res);
}
function destroySession(sessionID, res) {
    PlaySession.remove({
        _id: sessionID
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
    PlaySession.findById(sessionID, function (err, session) {
        if (err) {
            handler.error(err);
            return;
        }
        if (session == null) {
            handler.error(new Error('Session doesn\'t exist'));
            return;
        }
        console.log(session);
        var result = {
            task: session.task,
            progress: {
                count: session.locationCount,
                done: session.locationCount - session.locationsToVisit.length - (session.task == 'findLocation' ? 1 : 0)
            }
        };

        if (session.task == 'won') {
            Config.get('winText', function(err, winText){
                if (err) {
                    handler.error(err);
                    return;
                }
                result.winText = winText;
                res.send(result);
            })
        } else {
            Location.findById(session.locationID, function (err, location) {
                if (err) {
                    handler.error(err);
                    return;
                }
                if (!location) {
                    destroySession(session._id, res);
                    handler.error(new Error("location not found, session is invalid"));
                    return;
                }
                result.location = filterObject(location, ['name', 'image']);

                Riddle.findById(session.riddleID, function (err, riddle) {
                    if (err) {
                        handler.error(err);
                        return;
                    }
                    result.riddle = filterObject(riddle, ['name', 'description', 'hint', 'image']);
                    res.send(result);
                })
            });
        }
    });
}

// Will return whether the sent solution was right
// TODO: check for gamestate
function solveRiddle(req, res, next) {
    var sessionID = req.params.sessionid;
    var answer = req.body.answer;
    if (!answer) {
        res.send(new Error('No answer provided'));
        return;
    }
    PlaySession.findById(sessionID, function (err, session) {
        if (err) {
            res.send(err);
            return;
        }
        if (!session) {
            res.send(new Error('Invalid session'));
            return;
        }
        session.lastUpdated = new Date();
        if (session.task != 'solveRiddle') {
            res.send(new Error('Not the time to solve riddles.'));
            return;
        }

        Riddle.findById(session.riddleID, function (err, riddle) {
            if (err) {
                res.send(err);
                return;
            }
            if (normalize(riddle.answer) == normalize(answer)) {
                advanceState(session, res, function () {
                    res.send({correctAnswer: true});
                });
            } else {
                res.send({correctAnswer: false});
            }
        });
    });
}

function updateHeat(location, change, callback) {

    if (location.heat + change >= 0) {
        location.heat += change;
        location.save(function (err) {
            if (err) {
                res.send(err);
                return;
            }

            callback();
        });
    } else {
        callback();
    }
}

// Will check if the location is right. if it is, will allow to solve riddle
function checkLocation(req, res, next) {
    var sessionID = req.params.sessionid;
    var tagID = req.body.tagID;
    PlaySession.findById(sessionID, function (err, session) {
        if (err) {
            res.send(err);
            return;
        }
        if (!session) {
            res.send(new Error('Invalid session'));
            return;
        }
        session.lastUpdated = new Date();
        if (session.task != 'findLocation') {
            res.send(new Error('Not the time to solve riddles.'));
            return;
        }

        Tag.findOne({'tagID': tagID}, function (err, tag) {
            if (err) {
                res.send(err);
                return;
            }
            if (!session || !tag) {
                res.send({'ERROR': 'Please check your parameters :/'});
                return;
            }
            if (session.locationID == tag.locationID) {

                // Correct locaction, lets update the session then
                session.task = 'solveRiddle';
                session.save(function (err) {
                    if (err) {
                        res.send(err);
                        return;
                    }

                    res.send({correctLocation: true});
                });
            } else {
                res.send({correctLocation: false});
            }
        });
    });
}

function normalize(string) {
    return string.toLowerCase().trim();
}


//cleanup and stuff
function heatCountdown() {
    Location.find(function (err, locations) {
        if (err) {
            return;
        }
        locations.forEach(function (location) {
            updateHeat(location, -1, function (err) {
                if (err) {
                    console.log('ERROR: ' + err);
                    return;
                }
            });
        });
    });
}

function sessionDeleter() {
    console.log('Cleaning up sessions:')
    PlaySession.find(function (err, sessions) {
        if (err) {
            console.log('ERROR: ' + err);
            return;
        }
        var currentTime = Date.now();
        sessions.forEach(function (session) {
            if (currentTime > session.lastUpdated.getTime() + sessionToDeleteTime) {
                session.remove(function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
    });
}
var sessionToDeleteTime = 1000 * 60 * 60 * 24 * 3; //3 Days

setInterval(heatCountdown, 1000 * 60 * 8);
setInterval(sessionDeleter, 1000 * 60 * 60);



module.exports = router;