var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var Item = new Schema({
  name: String,
  category: String,
  condition: String,
  userId: String,
});

module.exports = mongoose.model( 'Item', Item );
