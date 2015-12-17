var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');

var Config = require('../models/config');

var allowedKeys = {
    get: ['username', 'winText'],
    set: ['username', 'winText', 'password']
};

var setter = {
    username: setField('username'),
    winText: setField('winText'),
    password: setField(
        'password',
        function(keys){
            if(keys.password != keys.passwordRepeat){
                return 'Passwords are different';
            }
            return true;
        },
        function(input){
            return  bcrypt.hashSync(input);
        }
    )
};

function setField(field, validator, converter){
    var isValid = validator || function(){ return true };
    var convert = converter || function(val){ return val };

    return function(keys, res){
        if(!keys[field] || keys[field].length < 1){
            res.status(404);
            res.send('No '+field+' given.');
            return;
        }
        var valid = isValid(keys);
        if(valid !== true){
            res.status(404);
            res.send(valid);
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