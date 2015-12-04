var express = require('express');
var router = express.Router();
var RestFactory = require('./restfactory');
var AdminConfigApi = require('./adminConfigApi');
var AdminSessionApi = require('./adminSessionApi');

var Location = require('../models/location');
var Riddle = require('../models/riddle');
var Tag = require('../models/tag');
var PlaySession = require('../models/playSession');

router.use('/locations', RestFactory(Location));
router.use('/riddles', RestFactory(Riddle));
router.use('/tags', RestFactory(Tag));
router.use('/playsessions', RestFactory(PlaySession));
router.use('/config', AdminConfigApi);
router.use('/session', AdminSessionApi);

module.exports = router;