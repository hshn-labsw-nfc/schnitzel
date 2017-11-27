const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

/** @class Location */
const Location = mongoose.model('PlaySession', PlaySessionSchema);

module.exports = Location;