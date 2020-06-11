const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')

const app=express()
app.use(cors())
app.use(bodyParser.json())                                                                                                             
app.use('/admin/api',require('./routes/admin'))
require('./plugins/mongo')(app)
app.listen(3000,()=>{
    console.log('http://localhost:3000')
})