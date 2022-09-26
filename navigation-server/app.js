const express=require('express');

const app=express();

const userRoutes=require('./routes/user')

app.use(userRoutes)

app.get(('/'),(req,res)=>{
    res.send('Welcome to the homepage!')
})

app.use((req,res)=>{
    res.status(404).send('<h1>Page not found </h1>')
})

app.listen(3000)