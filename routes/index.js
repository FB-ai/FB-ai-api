var express = require('express');
var router = express.Router();

var fb = require('../fb');
var models = require('../models');
var User = models.User;

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

  // console.log(req.session);
  if(req.session.fbsk_state)
    return next();

  next({
    status: 401,
    message: 'No session on the server.'
  });
};

// use authentication on this router
router.use(isAuthenticated);

// send to fb to start login process
router.get('/startlogin', fb.redirectLoginForm);

// receive callback from facebook
router.get('/completelogin',
  // regenerate auth token, also populates req.facebook
  fb.authenticate,
  function(req, res, next){
  // console.log('facebook:', req.facebook);

  // load user details from facebook
  req.facebook.me(function(err, me){
    if(err)
      return next(err);
    // console.log(err, user);
    
    User
    .where({fb_id: me.id})
    .fetch()
    .then(function(user){
      // return user if found
      if(user)
        return user;

      // otherwise crate new user with fb retured 
      try{
        return User
        .forge({
          fb_id: me.id,
          name: me.name,
          token: req.session.fbsk_access_token,
          state: req.session.fbsk_state,
          // @TODO: maybe a registration page to add more details to the user
          organization: 'Something'
        })
        .save();
      }
      catch(err){
        next(err);
      };
    })
    .then(function(user){
      // console.log(user);
      req.session.user = user.serialize();

      next({
        status: 200,
        success: true,
        user: user.serialize()
      });
    })
    .catch(next);  
  });
});

// router.all('/getprofile', function(req, res, next){});

// dummy function for testing
router.all('/', function(req, res, next){
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
