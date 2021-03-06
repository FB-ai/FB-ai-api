var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');

var routes = require('./routes/index');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookie sessions
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({secret : process.env.SESSION_SECRET}));

// static file hosting
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// json response handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(json, req, res, next) {
    json.status = json.status || 500;
    res.status(json.status);
    res.json(json);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(json, req, res, next) {
  delete json.message;

  json.status = json.status || 500;
  res.status(json.status);
  res.json(json);
});


module.exports = app;
