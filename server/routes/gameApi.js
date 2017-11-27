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
  console.log(arr);
  return arr.splice(getRandomInt(0, arr.length), 1)[0];
}

function filterObject(obj, keys) {
  var filteredObj = {};
  keys.forEach(function (key) {
    filteredObj[key] = obj[key];
  });
  return filteredObj;
}

function uniqueFilter(property) {
  var foundElements = {};
  return function (el) {
    if (foundElements.hasOwnProperty(el[property])) {
      return false;
    }
    foundElements[el[property]] = true;
    return true;
  }
}

// Will return the sessionid of the playsession
function startPlaySession(req, res, next) {
  var locationCount = 0;

  Tag.find()
    .populate('location')
    .exec(function (err, tags) {
      if (err) {
        handler.error(err);
        return;
      }

      var activeTags = tags.filter(function (tag) {
        return (tag.location != undefined && tag.location.isActive == true);
      }).filter(uniqueFilter('location'));

      console.log("activeTags", activeTags);

      locationCount = activeTags.length;

      Riddle.find()
        .populate('location')
        .exec(function (err, riddles) {
          if (err) {

            handler.error(err);
            return;
          }

          var nonLocationRiddles = riddles.filter(function (riddle) {
            return ((riddle.location == undefined || riddle.location == null) && riddle.isActive);
          });

          var locationRiddles = riddles.filter(function (riddle) {
            return (riddle.location != undefined && riddle.location.isActive == true && riddle.isActive);
          });

          /**
           * selects all inactive quizzes
           */
          var inactiveRiddles = riddles.filter(function (riddle) {
            return (!riddle.isActive);
          });

          console.log("nonLocationRiddles", nonLocationRiddles);
          console.log("locationRiddles", locationRiddles);
          console.log("inactiveRiddles", inactiveRiddles);

          var riddlecount = nonLocationRiddles.length + locationRiddles.length;
          //TODO way more complicated then this
          /**
           * starts new session only when enough quizzes are available
           */
          if (locationCount > 0 && riddlecount >= locationCount) {
            var groupName = req.body.groupName;
            var playSession = new PlaySession();
            playSession.groupName = groupName;
            playSession.startDate = new Date();
            advanceState(playSession, res, function (savedPlaySession) {
              res.send(savedPlaySession._id);
            });
          } else {
            res.status(503);
            res.end();
          }
        });
    });

}

function advanceState(playSession, res, callback) {
  var handler = new ResponseHandler(res);
  playSession.lastUpdated = new Date();
  playSession.task = 'findLocation';

  Tag.find()
    .populate('location')
    .exec(function (err, tags) {
      if (err) {
        handler.error(err);
        return;
      }

      var activeTags = tags.filter(function (tag) {
        return (tag.location != undefined && tag.location.isActive == true);
      }).filter(uniqueFilter('location'));

      if (!playSession.locationCount) {
        playSession.locationCount = activeTags.length;
        playSession.locationsToVisit = activeTags.map(function (tag) {
          return tag.location._id;
        });
      }

      if (playSession.locationsToVisit.length == 0) {
        playSession.task = 'won';
        playSession.endDate = new Date();
        _finishAdvanceState(playSession, res, callback);
      } else {
        var locations = activeTags.map(function (tag) {
          return tag.location;
        });
        _getLocationID(playSession, locations, function (res) {
          playSession.location = res;
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
      playSession.riddle = _getRiddleID(playSession, riddles);
      playSession.usedRiddles.push(playSession.riddle);


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
    return ((riddle.location == undefined || riddle.location == null) && riddle.isActive);
  });

  var locationRiddles = unusedRiddles.filter(function (riddle) {
    return (riddle.location != undefined && riddle.location.equals(session.location) && riddle.isActive);
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

function getState(req, res, next) {
  var handler = new ResponseHandler(res);
  var sessionID = req.params.sessionid;

  PlaySession.findById(sessionID)
    .populate('location')
    .populate('riddle')
    .exec(function (err, session) {
      if (err) {
        handler.error(err);
        return;
      }
      if (session == null) {
        handler.error(new Error('Session doesn\'t exist'));
        return;
      }

      var result = {
        task: session.task,
        progress: {
          count: session.locationCount,
          done: session.locationCount - session.locationsToVisit.length - (session.task == 'findLocation' ? 1 : 0)
        },
        dates: {
          startDate: session.startDate,
          endDate: session.endDate
        }
      };

      if (session.task == 'won') {
        Config.get('winText', function (err, winText) {
          if (err) {
            handler.error(err);
            return;
          }
          result.winText = winText;
          res.send(result);
        })
      } else {

        if (!session.location) {
          destroySession(session.session._id, res);
          handler.error(new Error("location not found, session is invalid"));
          return;
        }
        result.location = filterObject(session.location, ['name', 'image']);

        result.riddle = filterObject(session.riddle, ['name', 'description', 'hint', 'image']);
        res.send(result);
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

    Riddle.findById(session.riddle, function (err, riddle) {
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
      if (session.location.equals(tag.location)) {

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