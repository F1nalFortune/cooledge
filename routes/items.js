var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Item = require('../models/item');
var Offer = require('../models/offer');
var cloudinary = require('cloudinary');


//ITEMS

router.get('/', function(req, res) {
  Item.find({}, function(err, items) {
    res.json(items);
  });
});

router.get('/:id', function(req, res) {
  Item.findById(req.params.id, function(err, item) {
    res.json(item);
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
    userId: req.body.userId
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
  new Offer({
    name: req.body.name,
    offer: req.body.offer,
    itemId: req.body.itemId
  }).save( function(err, offer) {
    res.json(offer);
  }).fail( function(err, data) {
    console.log("Add offer to item failed.");
  });
})

module.exports = router;
