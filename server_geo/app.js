var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var index = require('./routes/index');

var app = express();

// view engine setup
app.all('*', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(400).send("ERROR");
})

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(400);
  res.render('error');
});

module.exports = app;
