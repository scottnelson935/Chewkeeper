const express = require("express");
const app = express();
const port = 8505;
const http = require("http");
const { emit } = require("process");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let pieceDone = false;

app.use(express.static('public'));

server.listen(port, () => {
    console.log("Server has started! :)")
})

io.on('connection', (socket) => {

    // Send the current state immediately upon connection
    socket.emit('firstEmit', pieceDone);

    console.log("A user connected");

    socket.on('pieceEnding', (pieceEnding) => {
        console.log(pieceEnding);
        if (pieceEnding === true) {
            pieceDone = true; // Update the global state
        } else {
            pieceDone = false;
        }
        io.emit('togglePieceActive', pieceDone); //2nd arg could be true
    })

    socket.on('endCheck', () => {
        socket.emit('togglePieceActive', pieceDone);
    });
});