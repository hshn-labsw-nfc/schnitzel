var mongoose = require('mongoose');

var TagSchema   = new mongoose.Schema({
    id: String,
    alias: String
});

module.exports = mongoose.model('Tag', TagSchema);