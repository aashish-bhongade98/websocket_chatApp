
const express = require('express')
const http = require('http');

// socket io needs http server to run it

const  app = express()
const server = http.createServer(app)

port = 3000


server.listen(port, ()=>{
    console.log(`http server running on ${port} `)
})
