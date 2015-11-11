var express = require('express');
var router = express.Router();

var data = [
    {
        _id: 0,
        alias: 'Labor'
    },
    {
        _id: 1,
        alias: 'Mensa'
    }
];

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(data);
});

module.exports = router;
