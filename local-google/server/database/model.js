const mongoose=require('mongoose')



const localSchema=new mongoose.Schema(
    {
       name:String,
       googleId:String,
       password:String
    }
)
const Local=mongoose.model('Local',localSchema)
module.exports=Local