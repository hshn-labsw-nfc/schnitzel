const mongoose = require('mongoose');

var RiddleSchema = new mongoose.Schema({
  name: String,
  image: Object,
  description: String,
  answer: String,
  hint: String,
  location: {type: mongoose.Schema.Types.ObjectId, ref: 'Location'},
  heat: Number,
  isActive: {type: Boolean, default: true}
});

/** @class Riddle */
const Riddle = mongoose.model('Riddle', RiddleSchema);

module.exports = Riddle;