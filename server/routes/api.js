var express = require('express');
var router = express.Router();

var location = require('./location');

router.use('/locations', location);

module.exports = router;
