const mongoose=require('mongoose')



const localSchema=new mongoose.Schema(
    {
       name:String,
       password:String
    }
)
const Local=mongoose.model('Local',localSchema)
module.exports=Local