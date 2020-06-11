const express = require('express');
const router = express.Router(); 
const Category=require('../../models/category')
router.post('/categories', (req,res)=>{  
    const model= Category.create(req.body).catch(e=>console.log(e))
    res.send(model)
})

router.get('/categories',async (req,res)=>{
    const items=await Category.find().limit(10)
    res.send(items)
})

router.get('/categories/:id',async (req,res)=>{
    const model=await Category.findById(req.params.id);
    res.send(model)
})

router.put('/categories/:id',async (req,res)=>{
    const model=Category.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
})

module.exports=router


