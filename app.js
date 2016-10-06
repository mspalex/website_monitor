//initial
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var schedule = require('node-schedule');


var httpTOOL = require('./tools/http_get.js');

//user modules
var mongoose = require('mongoose');

// pre defined routes
// var routes = require('./routes/index');

// user routes
var sites = require('./routes/sites');

// database connection
mongoose.connect('mongodb://localhost/site_monitordb');

// load the Schemas for MongoDB
require('./models/Sites');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// NOTES ABOUT STATIC CONTENT ON PUBLIC FOLDER
// since we are serving static PAGES with angular
// fetching the information
// the routes in routes/index.js will not be used
// only if more API endpoints are needed
// app.use('/', routes);
app.use('/sites', sites);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//periodic execution of all websites
var j = schedule.scheduleJob('* * * * *', function(){
    httpTOOL.verifySiteStatus();
    console.log("DEBUG scheduled task - verifySiteStatus()");
});

module.exports = app;
