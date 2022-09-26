const express=require('express')
const path=require('path')

const router=express.Router()

const Path=require('../utils/helpers')

router.get('/user',(req,res)=>{
    res.sendFile(path.join(Path,'views','UserData.html'))
})

module.exports=router