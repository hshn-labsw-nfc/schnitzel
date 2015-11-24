var express = require('express');
var router = express.Router();
var RestFactory = require('./restfactory');

var Location = require('../models/location');
var Riddle = require('../models/riddle');
var Tag = require('../models/tag');

router.use('/locations', RestFactory(Location));
router.use('/riddles', RestFactory(Riddle));
router.use('/tags', RestFactory(Tag));

module.exports = router;