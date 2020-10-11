const express=require('express')
const { Validator } = require('node-input-validator');
const helper=require('../helpers/helpers');
const db=require('../db/db');
const redis=require('../config/redis');
const helpers = require('../helpers/helpers');
const { hash } = require('bcrypt');
const signup=(req,res)=>{
 
    const body= req.body
    const v = new Validator(body, {
        Email: 'required|email',
        Password: 'required',
        UserName:'required'
      });

      v.check().then((matched) => {
        if (!matched) {
          res.status(422).send({"Error":v.errors,"ok":false});
        }else{
            const passwordhash=helpers.hashpassword(body.Password,res)
            body.Password=passwordhash

            db.signup(body,res)

        }
        

        
      });

}
const login=(req,res)=>{
  const body=req.body
  const v = new Validator(body, {
    Email: 'required|email',
    Password: 'required',
  });
  v.check().then((matched) => {
    if (!matched) {
      res.status(422).send({"Error":v.errors,"ok":false});
    }else{
       db.login(body,res)

    }
  })
}
function logout(req,res){
    let accesstoken=req.cookies.AccessToken
    redis.DEL(accesstoken)
    res.clearCookie("AccessToken")
    res.status(200).json({"ok":true,"message":"logout successfull"})
}
module.exports={signup,login,logout}