const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
  tagID: {type: String, unique: true},
  alias: String,
  location: {type: mongoose.Schema.Types.ObjectId, ref: 'Location'}
});

/** @class Tag */
const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;