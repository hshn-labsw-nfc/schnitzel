// TODO: Improve errormessages: hide the real messages, write a errorhandler, ...

var express = require('express');
var authentificator = require('./authMiddleware');

function getEntries(Model){
    return function(req, res, next){
        Model.find(function(err, entries){
            if(err){
                res.send(err);
                return;
            }
            res.send(entries);
        });
    }
}

function getEntry(Model) {
    return function (req, res, next) {
        var id = req.params.id;
        Model.findById(id, function (err, entry) {
            if (err) {
                res.send(err);
                return;
            }
            res.send(entry);
        });
    }
}

function createEntry(Model) {
    return function (req, res, next) {
        var model = new Model();
        Model.schema.eachPath(function(path) {
            if(req.body[path]){
                model[path] = req.body[path];
            }
        });

        model.save(function (err) {
            if (err) {
                res.send(err);
                return;
            }
            res.send({message: Model.modelName + ' created'});
        });
    }
}

function updateEntry(Model) {
    return function (req, res, next) {
        console.log("req",req.body);
        var id = req.params.id;
        Model.findById(id, function (err, entry) {
            if (err) {
                res.send(err);
                return;
            }
            Model.schema.eachPath(function(path) {
                if(req.body.hasOwnProperty(path)){
                    entry[path] = req.body[path];
                }
            });
            entry.save(function (err) {
                if (err) {
                    res.send(err);
                    return;
                }
                res.send({message: Model.modelName + ' updated'});
            });
        });
    }
}

function deleteEntry(Model) {
    return function (req, res, next) {
        var id = req.params.id;
        Model.remove({
            _id: id
        }, function (err, entry) {
            if (err) {
                res.send(err);
                return;
            }
            res.send({message: Model.modelName + ' deleted'});
        });
    }
}

function buildRouter(Model){
    var router = express.Router();
    router.use(authentificator);
    router.route('/')
        .get(getEntries(Model))
        .post(createEntry(Model));
    router.route('/:id')
        .get(getEntry(Model))
        .put(updateEntry(Model))
        .delete(deleteEntry(Model));

    return router;
}

module.exports = buildRouter;