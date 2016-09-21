var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', (req, res) => {
  User.find( (err, users) => {
    res.json(users);
  });
});

router.post('/', (req, res) => {
  new User({
    name : req.body.name,
    password : req.body.password,
    email : req.body.email,
    year : req.body.year,
    gender : req.body.gender,
    username : req.body.username,
    age : req.body.age
  }).save( (err, user) => {
    res.json(user);
  });
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    res.json(user);
  });
});

module.exports = router;
