var mongoose = require('mongoose');

var LocationSchema   = new mongoose.Schema({
    room: String,
    name: String,
    description: String,
    isActive: Boolean,
    category: String,
    seatingCount: Number,
    pcCount: Number,
    projectorCount: Number,
    printerCount: Number

});

module.exports = mongoose.model('Location', LocationSchema);