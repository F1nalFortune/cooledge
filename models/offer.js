var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var Offer = new Schema({
  name: String,
  offer: String,
  contact: String,
  itemId: String,
  userId: String
});

module.exports = mongoose.model( 'Offer', Offer );
