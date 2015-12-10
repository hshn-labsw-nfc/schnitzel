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
    image: Object
});

module.exports = mongoose.model('PlaySession', PlaySessionSchema);