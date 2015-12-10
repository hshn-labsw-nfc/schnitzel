function authentificator(req, res, next) {

    next();
    return;

    var token = req.headers['X-Auth-Token'];

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
            res.end();
            return;
        }
    });
}

function checkAuth(token, callback) {
    callback(true);
}

module.exports = authentificator;