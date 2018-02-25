var express = require('express');
var router = express.Router();
var httpProxy = require('express-http-proxy');

// restaurant info service
router.get('/restaurants/:id', function(req, res) {
  httpProxy("http://localhost:5000")(req, res);
});

// user service
router.post('/userlocation', function(req, res) {
  httpProxy("http://localhost:7000")(req, res);
});

router.post('/getuserlocation', function(req, res) {
  httpProxy("http://localhost:7000")(req, res);
});

// geo services
router.get('/geoencode', function(req, res) {
  httpProxy("http://localhost:4000")(req, res);
});

router.post('/search', function(req, res) {
  httpProxy("http://localhost:4000")(req, res);
});

router.post('/preload', function(req, res) {
  httpProxy("http://localhost:4000")(req, res);
});

module.exports = router;
