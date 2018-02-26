var express = require('express');
var router = express.Router();
var httpProxy = require('express-http-proxy');

const geoProxy = "http://geo";
const restinfoProxy = "http://restinfo";
const userProxy = "http://user";

// restaurant info service
router.get('/restaurants/:id', function(req, res) {
  httpProxy(restinfoProxy)(req, res);
});

// user service
router.post('/userlocation', function(req, res) {
  httpProxy(userProxy)(req, res);
});

router.post('/getuserlocation', function(req, res) {
  httpProxy(userProxy)(req, res);
});

// geo services
router.get('/geoencode', function(req, res) {
  console.log(123);
  httpProxy(geoProxy)(req, res);
});

router.post('/search', function(req, res) {
  httpProxy(geoProxy)(req, res);
});

router.post('/preload', function(req, res) {
  httpProxy(geoProxy)(req, res);
});

module.exports = router;
