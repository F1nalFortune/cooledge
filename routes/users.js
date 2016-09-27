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

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    Item.find({userId: req.params.id}, (err, items) =>{
      res.json({user, items})
    })
  });
});

module.exports = router;
