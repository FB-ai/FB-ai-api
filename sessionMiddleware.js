var fb = require('./fb');
var models = require('./models');
var User = models.User;

// checks it the user has a session and lets through or pushes back to login
function isAuthenticated(req, res, next){
  // no authentication for these paths
  if(
    ['/session/start']
    .some(function(route){
      return req.url.indexOf(route) != -1;
    })
  )
    return next();

  console.log(req.session);
  if(req.session.fbsk_state)
    return next();

  next({
    status: 401,
    message: 'No session on the server.'
  });
};

function loadOrSaveUser(req, res, next){
  // console.log('facebook:', req.facebook);

  // load user details from facebook
  req.facebook.me(function(err, me){
    // console.log(err, me);
    if(err)
      return next(err);
    
    User
    .where({fb_id: me.id})
    .fetch()
    .then(function(user){
      // console.log('found user:', user);
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
        console.log('error saving user:', err);
        next(err);
      };
    })
    .then(function(user){
      // console.log('found/created user:', user);
      req.session.user = user.serialize();
      next();
    })
    .catch(next);  
  });
};

module.exports = {
  isAuthenticated: isAuthenticated,
  loadOrSaveUser: loadOrSaveUser
};