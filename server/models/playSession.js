var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var PlaySessionSchema = new Schema({
    lastUpdated: Date,
    groupName: String,
    startDate: Date,
    endDate: Date,
    locationsToVisit: [String],
    locationCount: Number,
    usedRiddles: [Schema.Types.ObjectId],
    task: String, // won, solveRiddle, findLocation
    riddle: {type: Schema.Types.ObjectId, ref: 'Riddle'},
    location: {type: Schema.Types.ObjectId, ref: 'Location'},
    image: Object
});

module.exports = mongoose.model('PlaySession', PlaySessionSchema);