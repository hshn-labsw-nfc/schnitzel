var mongoose = require('mongoose');

var SchnitzelSchema   = new mongoose.Schema({
    tagID: String,
    alias: String
});

module.exports = mongoose.model('Schnitzel', SchnitzelSchema);