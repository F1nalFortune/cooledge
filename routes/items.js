var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Item = require('../models/item');
var Offer = require('../models/offer');
var User = require( '../models/user');


//ITEMS

router.get('/', function(req, res) {
  Item.find({}, function(err, items) {
    res.json(items);
  });
});

router.get('/:id', function(req, res) {
  Item.findById(req.params.id, function(err, item) {
    Item.find({userId:item.userId}, function(err, items){
      User.findById( item.userId, function( err, user){
        Offer.findOne({itemId: item._id}, function(err, offer) {
          res.send( 200, { user: user, item:item, items:items, offer:offer } );
        });
      });
    });
  })
})

router.delete('/:id', function(req, res) {
  Item.findById(req.params.id, function(err, item) {
    item.remove();
    res.status(200).send({success: true});
  })
})

router.put('/:id', function(req, res) {
  Item.findByIdAndUpdate(
    req.params.id,
    { $set : { url: req.body.url }},
    { new: true },
    function(err, item) {
      res.json(item);
  });
})

router.post('/', function(req, res) {
  new Item({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    condition: req.body.condition,
    userId: req.body.userId,
    needed: req.body.needed
  }).save( function(err, item) {
    res.json(item);
  })
})


// OFFER CRUD

router.get('/:id/offers', function(req, res) {
  Offer.findById(req.params.id, function(err, offers) {
    res.json(offers);
  });
});

router.delete('/offers/:id', function(req, res) {
  Offer.findById(req.params.id, function(err, offer) {
    offer.remove();
    res.status(200).send({success: true});
  })
})

router.post('/:id/offers', function(req, res) {
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
