const express = require('express');
const router = express.Router(); 
const Category=require('../../models/category')
router.post('/categories',async(req,res)=>{
    const model=await Category.create(req.body)
    res.send(model)
})



