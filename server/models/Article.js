const mongoose=require('mongoose')
const schema=mongoose.Schema({
    title:{type:String},
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:"Category"}]  ,
    body:{type:String}
},{timestamp:true})
module.exports=mongoose.model('Article',schema)