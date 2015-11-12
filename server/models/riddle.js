var mongoose = require('mongoose');

var RiddleSchema   = new mongoose.Schema({
    name: String,
    description: String,
    answer: String
});

module.exports = mongoose.model('Riddle', RiddleSchema);