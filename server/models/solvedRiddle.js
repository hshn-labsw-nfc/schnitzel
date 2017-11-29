const mongoose = require('mongoose');

const SolvedRiddleSchema = new mongoose.Schema({
  riddle: {type: mongoose.Schema.Types.ObjectId, ref: 'Riddle'},
  tries: Number,
  points: Number,
});

/** @class SolvedRiddle */
const SolvedRiddle = mongoose.model('SolvedRiddle', SolvedRiddleSchema);

module.exports = SolvedRiddle;