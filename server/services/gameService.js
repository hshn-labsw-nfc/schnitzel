const Config = require('../models/config');
const PlaySession = require('../models/playSession');
const SolvedRiddles = require('../models/solvedRiddle');

async function getGameState(sessionID) {
  const session = await PlaySession.findById(sessionID)
    .populate('location')
    .populate('riddle')
    .exec();

  if (session === null) {
    throw new Error('Session doesn\'t exist');
  }

  const result = {
    task: session.task,
    progress: {
      count: session.locationCount,
      done: session.locationCount - session.locationsToVisit.length - (session.task === 'findLocation' ? 1 : 0)
    },
    dates: {
      startDate: session.startDate,
      endDate: session.endDate
    }
  };

  if (session.task === 'won') {
    Config.get('winText', function (err, winText) {
      if (err) {
        throw err;
      }
      result.winText = winText;
      return result;
    })
  } else {
    if (!session.location) {
      throw new Error("location not found, session is invalid");
    }
    result.points = await calcPoints(session);
    result.location = filterObject(session.location, ['name', 'image']);
    result.riddle = filterObject(session.riddle, ['name', 'choices', 'description', 'hint', 'image']);
    return result;
  }
}

function filterObject(obj, keys) {
  const filteredObj = {};
  keys.forEach(function (key) {
    filteredObj[key] = obj[key];
  });
  return filteredObj;
}

async function calcPoints(session) {
  let sum = 0;
  for (let i = 0, len = session.solvedRiddles.length; i < len; i++) {
    const solvedRiddle = await SolvedRiddles.findById(session.solvedRiddles[i]).exec();
    if (solvedRiddle.points) {
      sum = sum + solvedRiddle.points
    }
  }
  return sum;
}

module.exports = {
  getGameState
};