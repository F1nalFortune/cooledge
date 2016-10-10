var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var Offer = new Schema({
  name: String,
  contact: String,
  offer: String,
  itemId: String,
  userId: String
});

module.exports = mongoose.model( 'Offer', Offer );
