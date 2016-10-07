var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var Item = require('../models/item');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', (req, res) => {
  User.find( (err, users) => {
    res.json(users);
  });
});

router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $set : { url: req.body.url, new: true }},
    (err, user) => {
      res.json(user);
  });
});

router.put('/url/:id', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $set : { url: req.body.url }},
    (err, user) => {
      res.json(user);
  });
});



router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, users) => {
    Item.find({userId: req.params.id}, (err, items) => {
      res.json({users, items})
    })
  });
});

module.exports = router;
