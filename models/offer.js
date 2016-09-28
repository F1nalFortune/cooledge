var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var Offer = new Schema({
  name: String,
  offer: String,
  itemId: String
});

module.exports = mongoose.model( 'Assignment', Assignment );
