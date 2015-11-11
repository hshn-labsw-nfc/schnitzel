var mongoose = require('mongoose');

var TagSchema   = new mongoose.Schema({
    tagID: String,
    alias: String
});

module.exports = mongoose.model('Tag', TagSchema);