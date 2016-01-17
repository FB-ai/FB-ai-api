var fbgraph = require('fbgraphapi');

fbgraph.authenticate = fbgraph.auth({
  appId : process.env.FB_APP_ID,
  appSecret : process.env.FB_APP_SECRET,
  redirectUri : process.env.APP_URL+'/session/refresh',
  apiVersion: process.env.FB_API_VERSION
});

module.exports = fbgraph;