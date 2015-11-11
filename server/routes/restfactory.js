var express = require('express');

function getEntries(model){
    return function(req, res, next){
        model.find(function(err, entries){
            if(err){
                res.send(err);
            }
            res.send(entries);
        });
    }
}

function getEntry(model) {
    return function (req, res, next) {
        var id = req.params.id;
        model.findById(id, function (err, entry) {
            if (err) {
                res.send(err);
            }
            res.send(entry);
        });
    }
}

function createEntry(model) {
    return function (req, res, next) {
        var tag = new model();
        tag.id = req.body.id;
        tag.alias = req.body.alias;

        tag.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.send({message: model.modelName + ' created'});
        });
    }
}

function updateEntry(model) {
    return function (req, res, next) {
        var id = req.params.id;
        model.findById(id, function (err, entry) {
            if (err) {
                res.send(err);
            }
            entry.id = req.body.id;
            entry.alias = req.body.alias;
            entry.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.send({message: model.modelName + ' updated'});
            });
        });
    }
}

function deleteEntry(model) {
    return function (req, res, next) {
        var id = req.params.id;
        model.remove({
            _id: id
        }, function (err, entry) {
            if (err) {
                res.send(err);
            }
            res.send({message: model.modelName + ' deleted'});
        });
    }
}

function buildRouter(model){
    var router = express.Router();

    router.route('/')
        .get(getEntries(model))
        .post(createEntry(model));
    router.route('/:id')
        .get(getEntry(model))
        .put(updateEntry(model))
        .delete(deleteEntry(model));

    return router;
}

module.exports = buildRouter;