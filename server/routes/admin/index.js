const express = require('express');
const router = express.Router(); 

router.post('/', (req,res)=>{  
    const model= req.Model.create(req.body).catch(e=>console.log(e))
    res.send(model)
})

router.get('/',async (req,res)=>{
    let queryOptions={}
    if(req.Model.modelName=='Category'){
        queryOptions.populate='parent'
    }
    const items=await req.Model.find().setOptions({
       queryOptions
    }).limit(10)
    res.send(items)
})

router.delete('/:id',async(req,res)=>{
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({message:'success'})
})
router.get('/:id',async (req,res)=>{
    const model=await Category.findById(req.params.id);
    res.send(model)
})

router.put('/:id',async (req,res)=>{
    const model=Category.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
})

module.exports=router



