var mongoose = require('mongoose');

var LocationSchema   = new mongoose.Schema({
    room: String,
    name: String,
    description: String,
    tagID: String
});

module.exports = mongoose.model('Location', LocationSchema);