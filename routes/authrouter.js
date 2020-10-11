
const express=require('express')
const AuthRouter=express.Router();
const AuthController=require('../controllers/authcontroller')
AuthRouter.post("/signup",(req,res)=>{
    
    AuthController.signup(req,res)
})
AuthRouter.post("/login",(req,res)=>{
    AuthController.login(req,res)
})
AuthRouter.get("/logout",(req,res)=>{
    AuthController.logout(req,res)
})
module.exports=AuthRouter