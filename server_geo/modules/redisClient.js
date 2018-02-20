const config = require('../../key/ENV.json');
const REDIS_URL = config.REDIS_HOST;
const REDIS_PORT = config.REDIS_PORT;
const redis = require('redis');
const client = redis.createClient({host: REDIS_URL, port: REDIS_PORT}); 

function set(key, value, callback){
    client.set(key, value, function(err, res){
        if(err){
            return;
        }
        callback(res);
    });
}

function get(key, callback){
    client.get(key, function(err, res){
        if(err){
            console.log(err);
            return;
        }
        callback(res);
    });
}

function expire(key, timeInSeconds){
    client.expire(key, timeInSeconds);
}

function quit(){
    client.quit();
}

function geoadd(long, lat, name, callback){
    client.geoadd('locations', long, lat, name, (err, res)=>{
        if(err){
            console.log(err);
            return;
        }
        callback(name, res);
    })
}

function georadius(long, lat, distance){
    client.georadius('locations', long, lat, distance, "mi", (err, res)=>{
        if(err){
            console.log(err);
            return
        }
        callback(res);
    })
}
 
module.exports = {
    get,
    set,
    expire,
    quit,
    redisPrint: redis.print,
    geoadd,
}
