var express = require('express');
var router = express.Router();

var data = [
    {
        _id: 0,
        room: 'A105',
        name: 'Labor',
        description: 'das ist ne beschreibung'
    },
    {
        _id: 1,
        room: 'A106',
        name: 'Labor',
        description: 'das ist ne andere beschreibung'
    }
];

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(data);
});

module.exports = router;
