const express = require("express");
const app = express();
const port = 8505;
const http = require("http");
const { emit } = require("process");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let pieceEnd = false;

app.use(express.static('public'));

server.listen(port, () => {
    console.log("Server has started! :)")
})

io.on('connection', (socket) => {

    // Send the current state immediately upon connection
    socket.emit('firstEmit', pieceEnd);

    console.log("A user connected");

    socket.on('firstMessage', (data) => {
        console.log(data);
        if (data === true) {
            pieceEnd = true; // Update the global state
        }
        io.emit('firstEmit', pieceEnd); //2nd arg could be true
    })
});