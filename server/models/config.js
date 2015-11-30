var mongoose = require('mongoose');

var ConfigSchema   = new mongoose.Schema({
    _id: String,
    value: {type: String, required: true}
});

var Model =  mongoose.model('Config', ConfigSchema);

function set(key, value, callback){
    Model.update({_id: key}, {value: value}, {upsert: true}, callback);
}

function get(key, callback){
    Model.findById(key, function(err, res){
        callback(err, (res ? res.value : null));
    })
}

module.exports = {
    set: set,
    get: get
};

