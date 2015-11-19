var express = require('express');
var router = express.Router();
var RestFactory = require('./restfactory');

var Location = require('../models/location');
var Riddle = require('../models/riddle');
var Tag = require('../models/tag');
var Schnitzel = require('../models/schnitzel');

router.use('/locations', RestFactory(Location));
router.use('/riddles', RestFactory(Riddle));
router.use('/tags', RestFactory(Tag));
router.use('/schnitzels', RestFactory(Schnitzel));

module.exports = router;
