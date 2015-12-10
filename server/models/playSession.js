var mongoose = require('mongoose');

var PlaySessionSchema = new mongoose.Schema({
    lastUpdated: Date,
    groupName: String,
    locationsToVisit: [String],
    locationCount: Number,
    usedRiddles: [String],
    task: String, // won, solveRiddle, findLocation
    riddleID: String,
    locationID: String,
    image: String
});

module.exports = mongoose.model('PlaySession', PlaySessionSchema);