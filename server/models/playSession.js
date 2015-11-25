var mongoose = require('mongoose');

var PlaySessionSchema = new mongoose.Schema({
    lastUpdated: Date,
    locationsVisited: [String],
    riddleToSolve: Boolean,
    nextRiddle: String,
    nextLocation: String
});

module.exports = mongoose.model('PlaySession', PlaySessionSchema);