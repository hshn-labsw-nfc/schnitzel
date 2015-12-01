var mongoose = require('mongoose');

var LocationSchema   = new mongoose.Schema({
    name: String,
    description: String,
    isActive: Boolean
});

module.exports = mongoose.model('Location', LocationSchema);