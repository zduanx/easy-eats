var express = require('express');
var router = express.Router();
const nodeRestClient = require('node-rest-client').Client;
const restClient = new nodeRestClient();
const config = require('../../key/API_KEY.json');
let strSim = require('string-similarity');

const API_PATH = "https://maps.googleapis.com/maps/api/geocode/json"
const API_KEY = config.GOOGLE_API;

const redisClient = require('../modules/redisClient');
const TIME_OUT_IN_SECONDS = 60 * 60 * 24;

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

router.post('/preload', (req, response)=> {
  data = req.body;
  redisClient.georadius(data.lang, data.lat, data.distance, (err, res)=>{
    if(err){
      response.status(400).send("INVALID QUERY");
    }else{
      redisClient.set(data.email, JSON.stringify(res), redisClient.redisPrint);
      redisClient.expire(data.email, TIME_OUT_IN_SECONDS);
      redisClient.get(data.email, (res)=> console.log(res));
      result = {
        number: res.length
      }
      response.json(result);
    }
  })
});

router.post('/search', (req, response)=> {
  reqbody = req.body;
  const value = reqbody.value;
  console.log(reqbody);

  async function asyncForEach(array, callback) {
    for(let index = 0; index < array.length; index++){
      await callback(array[index], index, array);
    }
  }

  redisClient.get(reqbody.email, data =>{

    if(data){
      const pool = JSON.parse(data);
      let valid = [];
      console.log(pool.length);

      const start = async() =>{
        await asyncForEach(pool, async (element)=>{
          await new Promise((resolve, reject) =>{
            redisClient.get(element, (val)=>{
              const obj = JSON.parse(val);
              const match = obj.matching;
              const confidence = strSim.compareTwoStrings(value, match);
              if(confidence > 0.2){
                obj["confidence"] = confidence;
                valid.push(obj);
              }
              resolve();
            })
          });
        })
        valid.sort((a,b)=>b.confidence - a.confidence);
        redisClient.set('search-' + reqbody.email, JSON.stringify(valid), redisClient.redisPrint);
        redisClient.expire('search-' + reqbody.email, TIME_OUT_IN_SECONDS);
        const result = {
          found: valid.length,
          info: valid.slice(0, 10)
        }
        response.json(result);
      }

      start()

    } else{
      response.status(400).send("INVALID QUERY");
    } 
  })
});

module.exports = router;