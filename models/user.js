var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  name : String,
  password : String,
  email : String,
  year : String,
  gender : String,
  username : String,
  age : String
});

module.exports = mongoose.model('User', User);
