var express = require('express');
var router = express.Router();
const nodeRestClient = require('node-rest-client').Client;
const restClient = new nodeRestClient();
const config = require('../../key/API_KEY.json');

const API_PATH = "https://maps.googleapis.com/maps/api/geocode/json"
const API_KEY = config.GOOGLE_API;

router.get('/geoencode', function(req, res) {
  const query = req.query.location;
  if(!query){
    res.status(400).send("INVALID QUERY");
  }
  else{
    const args = {
      parameters: {
        address: query,
        components: "country:US",
        key: API_KEY
      }
    };

    restClient.get(API_PATH, args, (data, response)=>{
      if(data["status"] != "OK"){
        res.status(400).send("INVALID QUERY");
      }

      result = {}
      result["location"] = data["results"][0]["geometry"]
      result["address"] = data["results"][0]["formatted_address"]
      res.json(result);
    });
  }
});

module.exports = router;