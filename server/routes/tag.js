var express = require('express');
var router = express.Router();

var TagDB = require('../models/tag');

router.get('/', getAllEntries);
router.get('/:id', getOneEntry);
router.post('/', createEntry);
router.put('/:id', updateEntry);
router.delete('/:id', deleteEntry);

function getAllEntries(req, res, next){
    TagDB.find(function(err, entries){
        if(err){
            res.send(err);
        }
        res.send(entries);
    });
}

function getOneEntry(req, res, next){
    var id = req.params.id;
    TagDB.findById(id, function(err, entry){
       if(err){
           res.send(err);
       }
       res.send(entry);
    });
}

function createEntry(req, res, next){
    var tag = new TagDB();
    tag.id = req.body.id;
    tag.alias = req.body.alias;

    tag.save(function(err){
        if(err){
            res.send(err);
        }
        res.send({ message: 'tag created'});
    });
}

function updateEntry(req, res, next){
    var id = req.params.id;
    TagDB.findById(id, function(err, entry){
        if(err){
            res.send(err);
        }
        entry.id = req.body.id;
        entry.alias = req.body.alias;
        entry.save(function(err){
            if(err){
                res.send(err);
            }
            res.send({ message: 'tag updated'});
        });
    });
}

function deleteEntry(req, res, next){
    var id = req.params.id;
    TagDB.remove({
        _id: id
    }, function(err, entry){
        if(err){
            res.send(err);
        }
        res.send({ message: 'tag deleted'});
    });
}

module.exports = router;
