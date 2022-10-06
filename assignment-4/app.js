const express=require('express')

const bodyParser=require('body-parser')
let app=express()

let users=[]


app.set('view engine','ejs')
app.set('views','views')

app.use(express.urlencoded({extended: true}))

app.get('/users',(req,res)=>{
    res.render('users', {pageTitle:'Users Page', userList:users});
})

app.get('/',(req,res)=>{
    res.render('index', {pageTitle:'Home Page'});
})

app.post('/',(req,res)=>{
   users.push(req.body.user)
   res.redirect('/users')
})



app.listen(3000)