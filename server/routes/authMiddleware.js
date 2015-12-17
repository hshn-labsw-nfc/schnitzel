var Config = require('../models/config');

function authentificator(req, res, next) {

    var token = req.headers['x-auth-token'];

    if(!token){
        res.status(401);
        res.send('No token provided');
        res.end();
        return;
    }

    checkAuth(token, function(isAuthenticated){
        if(isAuthenticated){
            next();
        }else{
            res.status(401);
            res.send('Wrong token');
            res.end();
            return;
        }
    });
}

function checkAuth(token, callback) {
    Config.get('token', function(err, dbToken){
        if(err){
            console.log(err);
            callback(false);
            return;
        }
        console.log(token, dbToken);
        callback(dbToken == token);
    });
}

module.exports = authentificator;