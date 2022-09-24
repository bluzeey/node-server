const express= require('express')

const app=express()

app.listen(3000)

app.use('/users',(req,res,next)=>{
   res.send('<h1>Welcome to the users page</h1>')
})

app.use('/',(req,res,next)=>{
    res.send('<h1>Welcome to the home page</h1>')
})