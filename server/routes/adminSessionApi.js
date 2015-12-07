var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');
var crypto = require('crypto');

var Config = require('../models/config');

router.post('/', createSession);
router.delete('/:token', deleteSession);

function createSession(req, res, next) {
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
        res.status(401);
        res.end();
        return;
    }

    Config.getLoginData(function (err, data) {
        if (err) {
            res.status(500);
            res.send(err);
            return;
        }
        console.log(data);
        if (!data.username && !data.password) {
            // empty db, lets fill it
            Config.set('username', 'admin', function (err) {
                if (err) {
                    res.status(500);
                    res.send(err);
                    return;
                }
                Config.set('password','passwort1337', function (err) {
                    if (err) {
                        res.status(500);
                        res.send(err);
                        return;
                    }
                    //now everything is set, lets just restart
                    createSession(req, res, next);
                });
            });
        }else{
            if (data.username == username && bcrypt.compareSync(password, data.password)) {
                var token = crypto.randomBytes(64).toString('hex');
                Config.set('token', token, function(err){
                    if (err) {
                        res.status(500);
                        res.send(err);
                        return;
                    }
                    res.send(token);
                });
            }else{
                res.status(401);
                res.send('Wrong username/password combination');
            }
        }
    });
}

function deleteSession(req, res, next) {
    var token = req.params.token;
    if(!token){
        res.status(401);
        res.send('wrong token');
        return;
    }
    Config.get('token', function(err, dbToken){
        if (err) {
            res.status(500);
            res.send(err);
            return;
        }
        if(token == dbToken){
            Config.set('token', '', function(err){
                if (err) {
                    res.status(500);
                    res.send(err);
                    return;
                }
                res.send('SUCCESS');
            });
        }else{
            res.status(401);
            res.send('wrong token');
            return;
        }
    })
}

module.exports = router;