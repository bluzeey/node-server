const express=require('express')
let app=express()

const users=[]

app.set('view engine','ejs')
app.set('views','views')

app.post('/',(req,res)=>{
   users.push(req.body.user)
   res.redirect('/users')
})

app.get('/',(res)=>{
   res.render('index', {pageTitle:'Home Page'})
})


app.get('/users',(res)=>{
    res.render('users', {pageTitle:'Users Page', users:users})
})


app.listen(3000)