var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var RiddleSchema   = new Schema({
    name: String,
    image: Object,
    description: String,
    answer: String,
    hint: String,
    location: {type: Schema.Types.ObjectId, ref: 'Location'},
    heat: Number,
    isActive: {type: Boolean, default: true}
});

module.exports = mongoose.model('Riddle', RiddleSchema);