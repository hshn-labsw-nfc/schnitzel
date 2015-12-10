var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var TagSchema   = new Schema({
    tagID: String,
    alias: String,
    location: {type: Schema.Types.ObjectId, ref: 'Location'}
});

module.exports = mongoose.model('Tag', TagSchema);