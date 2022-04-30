const express=require('express');
const db=require('mongoose');
const fs = require('fs');
const Connection_Options={
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    ssl: true,
    sslValidate: true,
    sslCA: fs.readFileSync('../rds-combined-ca-bundle.pem')
}

const  Client= async ()=>{
     db.connect(`mongodb://${process.env.DB_USR_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:27017/authdb?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&retryWrites=false`,Connection_Options).then(res=>{
        console.log("db ok",res)
    }).catch(eer=>{
        console.log("error db",eer);
    })
}


module.exports=Client