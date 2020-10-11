const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const redis = require('../config/redis');
const saltRounds = 10;
function hashpassword(password,res){
  let hash=bcrypt.hashSync(password,saltRounds)
  
  return hash
}
function comparepassword(hash,password){
    let compare=bcrypt.compareSync(password,hash)
    return compare
    
}
function generatetokens(data,res){
  try {
    const AccessToken=jwt.sign({
      id:data._id,
      Email:data.Email,
      exp: Math.floor(Date.now() / 1000) + (1 * 60)
    },process.env.ACCESS_TOKEN_SECRET,{algorithm:"HS256"})
    
    try{
      const RefreshToken=jwt.sign({
        id:data._id,
        Email: data.Email,
        exp: Math.floor(Date.now() / 1000) + (10080*60)
      },process.env.REFRESH_TOKEN_SECRET,{algorithm:"HS256"})
      return {AccessToken,RefreshToken}
    }catch(err){
      res.status(403).json({"ok":false,"Error":err})
    }
  } catch (err) {
    res.status(403).json({"ok":false,"Error":err})
  }
}
function verifytoken(AccessToken,req,res,next){

    jwt.verify(AccessToken,process.env.ACCESS_TOKEN_SECRET,{algorithms:"HS256"},function(err,result){
      
      if(err===null){
        
        req.headers.user=result.Email
        next()
      }else{
        if(err.name=="TokenExpiredError"){
          
          refreshtoken(AccessToken,req,res,next)
        }else{
          res.status(403).json({
            "ok":false,
            "Error":err.name,"message":"unauthorized"
          })
        }
      }
      
    })
   
   
  
}
function refreshtoken(AccessToken,req,res,next){
    
      redis.get(AccessToken,(err,result)=>{
        if(err!=null){
          res.status(403).json({"ok":false,"Error":err})
        }else{
          
              jwt.verify(result,process.env.REFRESH_TOKEN_SECRET,{algorithms:"HS256"},(err,refreshdata)=>{
                if(err!=null){
                  res.status(403).json({"ok":false,"Error":err})
                }else{
                  const newpayload={
                    id:refreshdata.id,
                    Email:refreshdata.Email,
                    exp: Math.floor(Date.now() / 1000) + (1*60)
                  }
                  jwt.sign(newpayload,process.env.ACCESS_TOKEN_SECRET,{algorithm:"HS256"},(err,newAccessToken)=>{
                    if(err!=null){
                      res.status(403).json({"ok":false,"Error":err})
                    }else{
                      res.cookie("AccessToken",newAccessToken,{
                        maxAge:Date.now()/1000+(2*2),
                        httpOnly:true,
                        sameSite:true
                      })
                      redis.del(AccessToken)
                      redis.set(newAccessToken,result,(err)=>{
                        if(err!=null){
                          res.status(403).json({"ok":false,"Error":err})
                        }else{
                         
                          req.headers.user=newpayload.Email
                          next()
                        }
                      })
                      redis.expire(newAccessToken,604800)

                    }
                  })

                }
               
                
              })
              
             
                
                
                
            
             

          }
            
      })

}
module.exports={hashpassword,comparepassword,generatetokens,verifytoken}