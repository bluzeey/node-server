const http=require('http');

const routehandler=require('./routes')

const myServer=http.createServer(routehandler)
myServer.listen(3000)

