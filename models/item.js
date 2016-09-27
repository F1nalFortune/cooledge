var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var Item = new Schema({
  name: String,
  category: String,
  description: String,
  condition: String,
  userId: String,
  url: String
});

module.exports = mongoose.model( 'Item', Item );
