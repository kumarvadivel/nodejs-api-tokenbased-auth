const Cors_config={
    //for safety measures always specify origins which your backends use here..
    origin:process.env.FRONTEND_PORT,
    credentials:true,
    allowedHeaders:"*",
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE"
}


module.exports=Cors_config