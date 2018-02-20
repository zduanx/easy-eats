const ENV = require('../key/ENV.json');
const MONGO_DB_HOST = ENV.MONGO_DB_HOST;
const MONGO_DB_PORT = ENV.MONGO_DB_PORT;
const YELP_DB_NAME = ENV.YELP_DB_NAME;
const YELP_TABLE_NAME = ENV.YELP_TABLE_NAME;
// connect mongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

url = "mongodb://" + MONGO_DB_HOST + ":" + MONGO_DB_PORT + "/" + YELP_DB_NAME
console.log(url);
console.log(YELP_DB_NAME);
mongoose.connect(url);
const redisClient = require('./modules/redisClient');
const TIME_OUT_IN_SECONDS = 60 * 60 * 24;


var model = mongoose.model(YELP_TABLE_NAME, new Schema({
    'identifier': String,
    'location': [String]
}, {collection: YELP_TABLE_NAME}));

// model.findOne({}, (err, data)=>{console.log(JSON.stringify(data))})

const cursor1= model.find({}).cursor();

cursor1.on('data', data=>{

    redisClient.geoadd(data.location[1], data.location[0], data.identifier, (name, res)=>{
        console.log(res);
        console.log(">>> added: " + name);
    });

    handleData(JSON.stringify(data));

})

function handleData(inputString){
    const data = JSON.parse(inputString);
    let a = data.name
    let b = ""
    if(data.keywords){
        b = data.keywords.join(" ")
    }
    let c = a + " " + b
    const snapshot = {
    name: data.name,
    rating: data.rating,
    count: data.count,
    phone: data.phone,
    image: data.image,
    identifier: data.identifier,
    matching: c
    };
    const snapshotstring = JSON.stringify(snapshot);
    console.log(snapshotstring);
    redisClient.set(data.identifier, snapshotstring, redisClient.redisPrint);
    redisClient.expire(data.identifier, TIME_OUT_IN_SECONDS);
}
