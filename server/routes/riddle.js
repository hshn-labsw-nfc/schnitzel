var express = require('express');
var router = express.Router();

var data = [
    {
        _id: 0,
        name: 'Tolles Rätsel',
        description: 'das ist ne beschreibung'
    },
    {
        _id: 1,
        name: 'Supertolles rätsel',
        description: 'das ist ne andere beschreibung'
    }
];

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(data);
});

module.exports = router;
