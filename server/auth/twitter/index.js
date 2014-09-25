'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('spotify', {
    failureRedirect: '/signup',
    scope: ['user-read-email', 'user-read-private'],
    session: false
  }))

  .get('/callback', passport.authenticate('spotify', {
    failureRedirect: '/signup',
    session: false
  }), auth.setTokenCookie);

module.exports = router;

// app.get('/auth/spotify',
//   passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'] }),
//   function(req, res){
//    // The request will be redirected to spotify for authentication, so this
//    // function will not be called.
// });

// 'use strict';

// var express = require('express');
// var passport = require('passport');
// var auth = require('../auth.service');

// var router = express.Router();

// router
//   .get('/', passport.authenticate('twitter', {
//     failureRedirect: '/signup',
//     session: false
//   }))

//   .get('/callback', passport.authenticate('twitter', {
//     failureRedirect: '/signup',
//     session: false
//   }), auth.setTokenCookie);

// module.exports = router;