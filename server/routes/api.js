var express = require('express');
var router = express.Router();

var adminApi = require('./adminApi');
var tagApi = require('./tagApi');

router.use('/admin', adminApi);
router.use('/tag', tagApi);

module.exports = router;
