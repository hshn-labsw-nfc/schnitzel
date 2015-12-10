var mongoose = require('mongoose');

var RiddleSchema   = new mongoose.Schema({
    name: String,
    image: Object,
    description: String,
    answer: String,
    hint: String,
    locationID: String,
    heat: Number
});

module.exports = mongoose.model('Riddle', RiddleSchema);