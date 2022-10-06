const express=require('express')
let app=express()



app.get('/',(req,res,next)=>{
   res.send('This template is working!')
})

app.get('/users',(req,res,next)=>{
    res.send('This is the users on our page.')
})


app.listen(3000)