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

router.get('/:id', function(req, res, next){
    var id = req.params.id;
    console.log(id);
    res.send(findUser(id));
});

function findUser(id){
    for(var i = 0; i < data.length; i++){
        if(data[i]._id == id){
            return data[i];
        }
    }
}

module.exports = router;
