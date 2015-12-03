var express = require('express');
var router = express.Router();


router.put('/', function(req, res, next){
    var fields = req.body;
    console.log(fields);
    res.send(fields.user?"Userupdate":"Endtextupdate");

});

router.get('/', function(req, res, next){

});

module.exports = router;