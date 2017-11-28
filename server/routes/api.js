const express = require('express');
const router = express.Router();

const adminApi = require('./adminApi');
const gameApi = require('./gameApi');

router.use('/admin', adminApi);
router.use('/game', gameApi);

module.exports = router;
