var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  description: String,
  isActive: {type: Boolean, default: false},
  image: Object,
  heat: {type: Number, default: 0}
});

/** @class Location */
const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;