var express = require('express');
var router = express.Router();

var fb = require('../fb');
var models = require('../models');
var User = models.User;
var sessionMiddleware = require('../sessionMiddleware');

// use authentication on this router
router.use(sessionMiddleware.isAuthenticated);

// send to fb to start login process
router.get('/startlogin', fb.redirectLoginForm);

// receive callback from facebook
router.get('/completelogin',
  fb.authenticate,
  sessionMiddleware.loadOrSaveUser,
  function(req, res, next){
    next({
      status: 200,
      success: true,
      user: req.session.user
    });
  }
);

// router.all('/getprofile', function(req, res, next){});

// dummy function for testing
router.all('/', function(req, res, next){
  next({
    status: 200,
    success: true
  });
});

router.all('/user', function(req, res, next){
  next({
    status: 200,
    success: true,
    user: req.session.user
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
