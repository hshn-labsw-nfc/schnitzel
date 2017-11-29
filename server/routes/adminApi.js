const express = require('express');
const router = express.Router();
const RestFactory = require('./restfactory');
const AdminConfigApi = require('./adminConfigApi');
const AdminSessionApi = require('./adminSessionApi');

const Location = require('../models/location');
const Riddle = require('../models/riddle');
const SolvedRiddles = require('../models/solvedRiddle');
const Tag = require('../models/tag');
const PlaySession = require('../models/playSession');

router.use('/locations', RestFactory(Location));
router.use('/riddles', RestFactory(Riddle));
router.use('/solvedriddles', RestFactory(SolvedRiddles));
router.use('/tags', RestFactory(Tag));
router.use('/playsessions', RestFactory(PlaySession));
router.use('/config', AdminConfigApi);
router.use('/session', AdminSessionApi);

module.exports = router;