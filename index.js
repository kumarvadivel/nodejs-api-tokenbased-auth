const express=require('express');
const app=express()
const csurf=require('csurf');
const cookieparser=require('cookie-parser')
require('dotenv').config();
const port=process.env.PORT;
const db=require('./config/mongodb')
const redis=require('./config/redis')
const cors=require('cors');
const AuthRouter=require('./routes/authrouter');
const HomeRouter=require('./routes/homerouter');
const middlewares = require('./middlewares/middlewares');
//database connection eshtablishment
//db()
//redis client connection eshtablishment
redis.set("redis","PONG",(err,rep)=>{
    if(err!=null){
        console.log("unable to connect to redis client.....")
    }
})
redis.get("redis",(err,rep)=>{
    if(err!=null){
        console.log(`If you see PONG after the colon every thing is successfull:${err}`)
    }
    console.log(`If you see PONG after the colon every thing is successfull:${rep}`)
})

console.log("redis",redis);
middlewares.requesthider(app)
middlewares.crossorigin(app)

middlewares.jsonconfig(app)

app.use(cookieparser())

const requestlimiter=middlewares.limiter

app.use("/api/auth",requestlimiter,AuthRouter)
app.use("/api/home",function(req,res,next){
    middlewares.AuthMiddleware(req,res,next)
},HomeRouter)
app.get('/dummy',(req,res)=>{
    res.status(200).json({"ok":true,"message":"authorized"})
})
app.listen(port,()=>{
    console.log(`server is listening on port: ${port}`)
})
