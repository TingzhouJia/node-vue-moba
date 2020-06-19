const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const Inflection=require('inflection')
const multer=require('multer')
const upload=multer({dest:__dirname+'/../../uploads'})
const app=express()
app.use(cors())
app.use(bodyParser.json())                                                                                                             
app.use('/admin/api/rest/:resource',async(req,res,next)=>{
    const modelName=Inflection.classify(req.params.resource)
    req.Model=require(`../../models/${modelName}`)
    next()
},require('./routes/admin'))
require('./plugins/mongo')(app)
require('./routes/web/index')(app)
app.post('/admin/api/upload',upload.single('file'),async(req,res,next)=>{

})
app.listen(3000,()=>{
    console.log('http://localhost:3000')
})