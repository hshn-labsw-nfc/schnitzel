var express = require('express');
var router = express.Router();
var RestFactory = require('./restfactory');

var Location = require('../models/location');
var Riddle = require('../models/riddle');
var Tag = require('../models/tag');
var PlaySession = require('../models/playSession');

router.use('/locations', RestFactory(Location));
router.use('/riddles', RestFactory(Riddle));
router.use('/tags', RestFactory(Tag));
router.use('/playsessions', RestFactory(PlaySession));

router.post('/session', function(req, res, next){
    console.log(req.body);
    var user = req.body.user;
    var password = req.body.password;
    if(!user || !password) {
        res.status(401);
        res.end();
    }
    if(user == 'test' && password == 'pw'){
        res.send({
            token: 'meintoken'
        });
    }
});

router.delete('/session/:id', function(req, res, next){

});

module.exports = router;