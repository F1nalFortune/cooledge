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

router.delete('/items/:id', function(req, res) {
  Item.findById(req.params.id, function(err, item) {
    item.remove();
    res.status(200).send({success: true});
  })
})

router.post('/', function(req, res) {
  new Item({
    name: req.body.name,
    category: req.body.category,
    condition: req.body.condition,
    userId: req.params.id
  }).save( function(err, item) {
    res.json(item)
  })
})

module.exports = router;
