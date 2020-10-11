const helmet=require('helmet')
const cors=require('cors')
const express=require('express');

const CorsConfig=require('../config/corsconfig');
const csurf=require('csurf');
const rateLimit=require('express-rate-limit');
const cookieparser=require('cookie-parser');
const helpers = require('../helpers/helpers');
//cross origin middleware to elimate free flow of data between backend and frontend
function crossorigin(app){
  return  app.use(cors(CorsConfig));
}
//middleware to protect the app headers information
function requesthider(app){
  return  app.use(helmet())
} 
//csurf middleware for prventing cross-site(xss) attacks

//json response configuration
function jsonconfig(app){
  return app.use(express.json())
}

//request limiter for middleware
var limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - user has full speed until the max limit is reached
});

function AuthMiddleware(req,res,next){
    const AccessToken=req.cookies.AccessToken
    
    helpers.verifytoken(AccessToken,req,res,next)
    
    
}
    

module.exports={crossorigin,requesthider,limiter,jsonconfig,AuthMiddleware}