var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next){
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

router.delete('/:id', function(req, res, next){

});

module.exports = router;