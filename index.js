
const express = require('express')
const http = require('http');

const {Server} = require('socket.io')

const path = require('path')
// socket io needs http server to run it

const  app = express()  // express to handle all the http requests
const server = http.createServer(app)
const io = new Server(server)  // to handle the sockets, have to use new keyword
// gives us  <script src="/socket.io/socket.io.js" ></script> to install in frontend
// can be checked in network tab of inspect and copy the url from top GET


// socket.io

io.on('connection', (socket)=>{  // on connection to front end we get socket(client)
    // in socket world a user is a socket
    console.log(`a new user connected id:`, socket.id ) // each socket has an id

   socket.on('frontend-msg', (message)=>{   //  server is receiving messages from front end
    //console.log('new user message', message) 

    // now we need to emit this message on server reeived from one user to other users
    io.emit('message', message) //io means all the connected sockets add this on frontend
   })

    socket.on('disconnect', ()=>{
        console.log(`user disconnected id:`, socket.id)
    })
} )

// now adding this to front end


app.use(express.static(path.resolve("./public")) )  // to enable using the static files in public folder

app.get( "/", (req, res)=>{

     res.sendFile( __dirname ,"/index.html")
} )


port = 3000
server.listen(port, ()=>{
    console.log(`http server running on ${port} `)
})
