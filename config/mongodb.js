const express=require('express');
const db=require('mongoose');

const Connection_Options={
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

const  Client= async ()=>{
    await db.connect(process.env.MONGODB_URI,Connection_Options,()=>{
        console.log("connection to  mongoDb database eshtablished successfully....")
    })
}


module.exports=Client