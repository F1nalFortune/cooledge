var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Item = require('../models/item');
var Offer = require('../models/offer');
var User = require( '../models/user');


//ITEMS

router.get('/', function(req, res) {
  Item.find({userId:{'$ne':req.query.userId}}, function(err, items) {
    res.json(items);
  });
});

router.get('/:id', function(req, res) {
  Item.findById(req.params.id, function(err, item) {
    Item.find({userId:item.userId}, function(err, items){
      User.findById( item.userId, function( err, user){
        res.send( 200, { user: user, item:item, items:items } );
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

module.exports = router;