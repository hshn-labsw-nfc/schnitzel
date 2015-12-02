var express = require('express');
var router = express.Router();

var adminApi = require('./adminApi');
var gameApi = require('./gameApi');
var loginApi = require('./loginApi');

router.use('/admin', adminApi);
router.use('/game', gameApi);
//router.use('/login', loginApi);

module.exports = router;
