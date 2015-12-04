var express = require('express');
var router = express.Router();

var Config = require('../models/config');

var allowedKeys = {
    get: ['username', 'winText'],
    set: ['username', 'winText', 'password']
};

var setter = {
    username: setField('username'),
    winText: setField('winText'),
    password: setField('password')
};

function setField(field, validator, converter){
    var isValid = validator || function(){ return true };
    var convert = converter || function(val){ return val };
    return function(keys, res){
        if(!keys[field] || keys[field].length < 1 || !isValid(keys)){
            res.status(404);
            res.send('No '+field+' given.');
            return;
        }
        Config.set(field, convert(keys[field]), function(err){
            if(err){
                res.status(500);
                res.send(err);
                return;
            }
            res.send('SUCCESS');
        });
    }
}

function setWinText(keys, res){

}

function setPassword(keys, res){

}

router.put('/:key', function(req, res, next){
    var key = req.params.key;
    if(allowedKeys.set.indexOf(key) != -1){
        var keys = req.body;
        setter[key](keys,res);
    }else{
        res.status(401);
        res.send('Setting  key "'+key+'" is not allowed');
    }


});

router.get('/:key', function(req, res, next){
    var key = req.params.key;
    if(allowedKeys.get.indexOf(key) != -1){
        Config.get(key, function(err, value){
            if(err){
                res.status(500);
                res.send(err);
                return;
            }
            res.send(value);
        });
    }
});

module.exports = router;