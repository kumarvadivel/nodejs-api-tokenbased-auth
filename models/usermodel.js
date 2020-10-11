const mongoose=require('mongoose')
const Schema=mongoose.Schema
require('mongoose-type-email')
const UserSchema=new Schema({
    UserName:{type:mongoose.SchemaTypes.String,unique:true},
    Email:{type:mongoose.SchemaTypes.Email,unique:true},
    Password:{type:String}
})

const UserModel=mongoose.model("users",UserSchema)

module.exports=UserModel