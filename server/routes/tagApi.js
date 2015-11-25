var express = require('express');
var router = express.Router();

var Location = require('../models/location');
var Riddle = require('../models/riddle');
var Tag = require('../models/tag');
var PlaySession = require('../models/playSession');

router.post('/start', startSchnitzel);
router.get('/state', getState);
router.post('/riddle', solveRiddle);

function startSchnitzel(req, res, next) {
    res.send('This will be the route to start a schnitzeljagt');
}

function getState(req, res, next) {
    res.send('This will be the route to get the current state (next location, next riddle, progress)');
}

function solveRiddle(req, res, next) {
    res.send('This will be the route to send a riddlesolution to the server');
}

module.exports = router;