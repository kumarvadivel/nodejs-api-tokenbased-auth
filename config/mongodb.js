const express=require('express');
const db=require('mongoose');
const fs = require('fs');
const Connection_Options={
    useNewUrlParser: true,
    useUnifiedTopology: false,
    useFindAndModify: false,
    useCreateIndex: true,
    ssl: true,
    sslValidate: false,
    sslCA: fs.readFileSync('./rds-combined-ca-bundle.pem')
}

const  Client= async ()=>{
    await db.connect(`mongodb://${process.env.DB_USR_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&retryWrites=false`,Connection_Options,(res)=>{
        console.log(res)
    })
}


module.exports=Client