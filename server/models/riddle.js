var mongoose = require('mongoose');

var RiddleSchema   = new mongoose.Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Riddle', RiddleSchema);