var express = require('express');
var router = express.Router();

var fb = require('../fb');

// checks it the user has a session and lets through or pushes back to login
function isAuthenticated(req, res, next){
  // no authentication for these paths
  if(
    ['/startlogin']
    .some(function(route){
      return req.url.indexOf(route) != -1;
    })
  )
    return next();

  if(req.session.fbsk_state)
    return next();

  next({
    status: 401,
    message: 'No session on the server.'
  });
};

router.use(isAuthenticated);

// send to fb to start login process
router.get('/startlogin', fb.redirectLoginForm);

// receive callback from facebook
router.get('/completelogin', function(req, res, next){
  next({
    status: 200,
    success: true
  });
});

// destroy session on the server
router.all('/logout', function(req, res, next){
  req.session = null;

  next({
    status: 200,
    success: true
  });
});

module.exports = router;
