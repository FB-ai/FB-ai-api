var express = require('express');
var router = express.Router();

var fb = require('../fb');
var sessionMiddleware = require('../sessionMiddleware');
var models = require('../models');
var User = models.User;
var Post = models.Post;
var Content = models.Content;

// use authentication on this router
router.use(sessionMiddleware.isAuthenticated);

// send to fb to start login process
router.get('/session/start', fb.redirectLoginForm);

// receive callback from facebook
router.get('/session/refresh',
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

// return logged in user details
router.all('/user', function(req, res, next){
  next({
    status: 200,
    success: true,
    user: req.session.user
  });
});

// destroy session on the server
router.all('/session/logout', function(req, res, next){
  req.session = null;

  next({
    status: 200,
    success: true
  });
});

// saving the post
router.post('/post', function(req, res, next){
  // console.log('received post request', req.body);

  Post
  .forge({
    user_id: req.session.user.id
  })
  .save()
  .then(function(post){
    // console.log('created post:', post.serialize());
    // console.log('trying to create content:', {
    //   post_id: post.get('id'),
    //   title: req.body.title,
    //   text_body: req.body.text_body,
    //   url: req.body.url
    // });

    Content
    .forge({
      post_id: post.get('id'),
      title: req.body.title,
      text_body: req.body.text_body,
      url: req.body.url
    })
    .save()
    .then(function(content){
      // console.log('created post content', content.serialize());
      var postWithConent = post.serialize();
      postWithConent.content = content.serialize()

      res
      .status(201)
      .json(postWithConent);
    })
    .catch(next);
  })
  .catch(next);
});

// list all the posts with the content bodies for the user
router.all('/user/posts', function(req, res, next){
  Post
  .where({
    user_id: req.session.user.id
  })
  .fetchAll({
    withRelated: ['contents']
  })
  .then(function(posts){
    // console.log('listing all posts:', posts);

    res
    .status(200)
    .json(posts.serialize());
  })
  .catch();
});

module.exports = router;
