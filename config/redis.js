const redis=require('redis');
const client = redis.createClient();

client.on("error",(error)=>{
    console.log(`error at redis connection line 4:${error}`)
})


module.exports=client