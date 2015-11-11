var express = require('express');
var router = express.Router();

var restFactory = require('./restfactory');

var TagDB = require('../models/tag');

router.get('/', restFactory.getEntries(TagDB));
router.get('/:id', restFactory.getEntry(TagDB));
router.post('/', restFactory.createEntry(TagDB));
router.put('/:id', restFactory.updateEntry(TagDB));
router.delete('/:id', restFactory.deleteEntry(TagDB));

module.exports = router;