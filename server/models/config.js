var mongoose = require('mongoose');

var ConfigSchema = new mongoose.Schema({
  _id: String,
  value: {type: String, required: true}
});

var Model = mongoose.model('Config', ConfigSchema);

function set(key, value, callback) {
  console.log('invoking setter');
  Model.findOneAndUpdate({_id: key}, {value: value}, {upsert: true}, function (err) {
    callback(err);
  });
}

function get(key, callback) {
  console.log('invoking getter');
  Model.findById(key, function (err, res) {
    console.log(key, err, res);
    callback(err, (res ? res.value : ""));
  })
}

function getLoginData(callback) {
  Model.find({_id: {$in: ['username', 'password']}}, function (err, data) {
    if (err) {
      callback(err, data);
      return;
    }
    var dataObject = {};
    data.forEach(function (field) {
      dataObject[field._id] = field.value;
    });
    callback(err, dataObject);
  });
}

module.exports = {
  set: set,
  get: get,
  getLoginData: getLoginData
};

