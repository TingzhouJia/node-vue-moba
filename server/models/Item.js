const mongoose=require('mongoose')
const schema=mongoose.Schema({
    name:{type:String},
    img:{type:String}
})
module.exports=mongoose.model('Item',schema)