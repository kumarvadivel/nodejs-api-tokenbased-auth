const express=require('express')
const HomeRouter=express.Router();


HomeRouter.get("/",(req,res)=>{
   
    res.status(200).json({"ok":true,"message":"authorized","user":req.headers.user})
})

module.exports=HomeRouter