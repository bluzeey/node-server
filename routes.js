function routehandler(req,res){
    if (req.url==='/'){
        res.write(`
        <html>
        <head><title>My webpage</title></head>
        <body>
        Welcome to my webpage
        <form action="/create-user" method="POST">
        <input type='text'>Add a username</input>
        <button>Submit</button>
        </form>
        </body>
        </html>`)
    }
    if(req.url=='/create-user' && req.method=="POST"){
        const body=[]
        req.on('data',chunk=>{
            body.push(chunk)
        })
        req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString()
            const user=parsedBody.split('=')[1]
            console.log(user)
        })
        res.write(`
        <html>
        <head><title>All users</title></head>
        <body>
        Here is a list of users
        <ul>
           <li>User 1</li>
           <li>User 2</li>
           <li>${user}</li>
        </ul>
        </body>
        </html>`)
    }
    res.end()
}
module.exports=routehandler