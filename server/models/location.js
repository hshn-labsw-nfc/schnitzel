var mongoose = require('mongoose');

var LocationSchema   = new mongoose.Schema({
    name: String,
    description: String,
    isActive: Boolean,
    heat: {type: Number,default: 0}
});

module.exports = mongoose.model('Location', LocationSchema);