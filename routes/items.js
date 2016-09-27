var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Item = require('../models/item');


//ITEMS

router.get('/', function(req, res) {
  Item.find({}, function(err, items) {
    res.json(items);
  });
});

router.delete('/:id', function(req, res) {
  Item.findById(req.params.id, function(err, item) {
    item.remove();
    res.status(200).send({success: true});
  })
})

router.post('/', function(req, res) {
  new Item({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    condition: req.body.condition,
    userId: req.params.userId
  }).save( function(err, item) {
    res.json(item)
  })
})


// OFFER CRUD

router.get('/:id/offers', function(req, res) {
  Offer.find({ ItemId: req.params.id}, function(err, offers) {
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
    ItemId: req.params.id
  }).save( function(err, offer) {
    res.json(offer)
  })
})

module.exports = router;
