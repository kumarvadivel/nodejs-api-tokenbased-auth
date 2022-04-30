const express=require('express');
const db=require('mongoose');
const fs = require('fs');
const Connection_Options={
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}

const  Client= async ()=>{
     await db.connect(`mongodb://${process.env.DB_USR_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:27017/authdb?retryWrites=false`,Connection_Options).then(res=>{
         console.log("dsads",res);
     })
     
}


module.exports=Client