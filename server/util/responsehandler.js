module.exports = function (response) {
  return {
    error: error.bind(response),
    success: success.bind(response)
  }
};

function error(err) {
  this.status(403);
  this.send({name: err.name, message: err.message});
  this.end();
}

function success(data) {
  this.send(data);
  this.end();
}