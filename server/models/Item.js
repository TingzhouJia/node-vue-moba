const mongoose=require('mongoose')
const schema=mongoose.Schema({
    name:{type:String},
    parent:{type:String}
})
module.exports=mongoose.model('Item',schema)