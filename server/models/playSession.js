var mongoose = require('mongoose');

var PlaySessionSchema = new mongoose.Schema({
    lastUpdated: Date,
    locationsVisited: [String],
    riddleToSolve: Boolean,
    riddleID: String,
    locationID: String
});

module.exports = mongoose.model('PlaySession', PlaySessionSchema);