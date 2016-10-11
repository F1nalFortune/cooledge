var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');


router.post('/signup', function(req, res) {
  User.register(new User({username: req.body.email}), req.body.password, function(err, user) {
    if (err)
      return res.json(500, err.message);
    user.name = req.body.name
    user.school = req.body.school
    user.year = req.body.year
    user.age = req.body.age
    user.save( function(err, user) {
      res.json({ id: user.id });
    });
  });
});

router.post('/signin', function(req, res) {
  User.findOne({ username: req.body.email}, function(err, user) {
    if (!user)
      return res.json(500, ("User does not exist"));
    user.authenticate(req.body.password, function(err, user, passwordErr) {
      if (err)
        return res.json(500, (err));
      if (passwordErr)
        return res.json(500, passwordErr.message);
      return res.json({ id: user.id });
    });
  });
});


module.exports = router;