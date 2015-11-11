var express = require('express');
var router = express.Router();

var location = require('./location');
var riddle = require('./riddle');
var tag = require('./tag');

router.use('/locations', location);
router.use('/riddles', riddle);
router.use('/tags', tag);

module.exports = router;
