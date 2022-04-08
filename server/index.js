const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path');
require('dotenv').config()
const webSocketServer = require('websocket').server;
const { client } = require('websocket');
//const {SERVER_PORT} = process.env
const PORT = process.env.PORT || 4000

const {seedDataBase, loginPart, registerPart, postMessage, showAllPosts, startNewGame, adminCheck, killGame, redSpy, blueSpy, redAgent, blueAgent,
     showTeams, newWords, showCards, addOpening, newClue, showTurn, nextTurn, showClue}= require("./controller.js")

//Spinning the http server and the websocket server.
const server = require('http'). createServer(app);
server.listen(PORT);
console.log(`listening on port ${PORT}`);

const wsServer = new webSocketServer({
    httpServer: server
})


const clients = {};

//This code generates unique userID for everyUser
 const getUniqueID = () =>{
    const s4 = ()=> Math.floor((1+Math.random()) * 10000).toString(16).substring(1)
    return s4() + s4() + '-' + s4();
}


//What should happen when the server recieves a request
wsServer.on('request', function (request){
    var userID = getUniqueID();
    //console.log((new Date()) + ' Recieved a new connection from origin' + request.origin + '.');


 //You can rewrite this part of the code to accept only the requests from allowed origin
 const connection = request.accept(null, request.origin)
 clients[userID] = connection
 //console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))

 //Message handler, will trigger when server recieves any message
 connection.on('message', function(message) {
     if (message.type === 'utf8') {
        console.log('Recieved Message: ', message.utf8Data)


         //broadcasting message to all connected clients
         for (key in clients){
             clients[key].sendUTF(message.utf8Data)
             //console.log('sent Message to: ', clients[key])
             console.log(`sent Message to client with id:${key}`)
         }
     }
 })

});



//Middleware
app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname,"../build")))
//Endpoints
app.post("/api/seed", seedDataBase)

app.post("/api/login", loginPart)

app.post("/api/register", registerPart)

app.post("/api/post", postMessage)

app.post("/api/startNew", startNewGame)

app.post("/api/redSpy", redSpy)

app.post("/api/blueSpy", blueSpy)

app.post("/api/redAgent", redAgent)

app.post("/api/blueAgent", blueAgent)

app.post("/api/newWords", newWords)

app.post("/api/newClue", newClue)

app.get("/api/show", showAllPosts)

app.get("/api/adminCheck", adminCheck)

app.get("/api/killGame", killGame)

app.get("/api/showTeams", showTeams)

app.get("/api/showCards", showCards)

app.get("/api/showTurn", showTurn)

app.get("/api/nextTurn", nextTurn)

app.get("/api/showClue", showClue)

app.put("/api/addOpening/:myParam", addOpening)


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

//app.listen(PORT, () => console.log(`up on ${PORT}`))