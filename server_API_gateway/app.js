var express = require('express');
var cors = require('cors');

var index = require('./routes/index');
var app = express();
app.use(cors()); 

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
