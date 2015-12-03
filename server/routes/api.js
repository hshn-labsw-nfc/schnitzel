var express = require('express');
var router = express.Router();

var adminApi = require('./adminApi');
var gameApi = require('./gameApi');

router.use('/admin', adminApi);
router.use('/game', gameApi);


module.exports = router;
