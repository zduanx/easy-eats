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

// model.findOne({}, 'identifier location', (err, data)=>{})

const cursor = model.find({}).cursor();

cursor.on('data', data=>{
    redisClient.geoadd(data.location[1], data.location[0], data.identifier, (name, res)=>{
        console.log(res);
        console.log(">>> added: " + name);
    });
})



