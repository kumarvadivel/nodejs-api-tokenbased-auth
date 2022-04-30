var RedisClustr = require('redis-clustr');
const RedisClient=require('redis');
var redis = new RedisClustr({
    servers: [
        {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
    ],
    createClient: function (port, host) {
        // this is the default behaviour
        return RedisClient.createClient(port, host);
    }
});

//connect to redis
redis.on("connect", function () {
  console.log("connected");
});

redis.on("error",(error)=>{
    console.log(`error at redis connection line 4:${error}`)
})


module.exports=redis