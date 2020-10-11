const { compareSync } = require('bcrypt')
const helpers = require('../helpers/helpers')
const UserModel=require('../models/usermodel')
const redis=require('../config/redis')
function signup(data,res){
    UserModel.find({
        $or:[

            {UserName: data.UserName}, {Email:data.Email}
        ]
    }).then((d)=>{
       
        if(d.length==0){
            var user=new UserModel(data)
            user.save(err=>{
                if(err){
                    res.status(403).json({"ok":false,"Error":err})
                }
                res.status(200).json({"ok":true,"message":"signup successfull"})
            })
        }
        else{
            if(data.Email===d[0].Email){
                res.status(403).json({"ok":false,"Error":"email already exsists..."})
            }
            res.status(403).json({"ok":false,"Error":"username already exsists"})
        }
    })
}
function login(data,res){
    UserModel.find({Email:data.Email}).then(d=>{
        if (d.length===0){
            res.status(403).json({"ok":false,"Error":"invalid login credentials"})
        }
        else{
            
           let compare=helpers.comparepassword(d[0].Password,data.Password)

           if(compare){
                let tokens=helpers.generatetokens(d[0],res)
                redis.set(tokens.AccessToken,tokens.RefreshToken,(err)=>{
                    if(err!=null){
                        res.status(403).json({"ok":false,"Error":err})
                    }

                })
                redis.expire(tokens.AccessToken,604800)
                res.cookie("AccessToken",tokens.AccessToken,{
                    maxAge:Date.now()/1000+(1*60),
                    httpOnly:true,
                    sameSite:true
                })
                res.status(200).json({"ok":true,"Message":"Login Successfull"})
           }else{
            res.status(403).json({"ok":false,"Error":"invalid password"})
           }
          
        }
    })
}

module.exports={signup,login}