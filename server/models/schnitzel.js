var mongoose = require('mongoose');

var SchnitzelSchema   = new mongoose.Schema({
    tagID: String
});

module.exports = mongoose.model('Schnitzel', SchnitzelSchema);