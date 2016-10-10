var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Item = require('../models/item');
var Offer = require('../models/offer');
var User = require( '../models/user');

// OFFER CRUD
router.get('/:item_id', function(req, res) {
  Offer.find( {'$and': [{userId: req.query.userId}, {itemId: req.params.item_id}] }, function(err, offer) {
    if(!offer){
      res.json({});
    }
    else{
      res.json(offer[0]);
    }
  });
});

router.delete('/offers/:id', function(req, res) {
  Offer.findById(req.params.id, function(err, offer) {
    offer.remove();
    res.status(200).send({success: true});
  })
})

router.post('/', function(req, res) {
  //Query offer database for offer with item id and user id match
  //if match return message saying can not add another offer
  //else build offer
  new Offer({
    name: req.body.name,
    offer: req.body.offer,
    contact: req.body.contact,
    itemId: req.body.itemId,
    userId: req.body.userId
  }).save( function(err, offer) {
    res.json(offer);
  })
})
module.exports = router;