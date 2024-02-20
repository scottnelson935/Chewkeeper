const express = require("express");
const app = express();
const port = 8505;
const http = require("http");
const { emit } = require("process");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));

server.listen(port, () => {
    console.log("Server has started! :)")
})

io.on('connection', (socket) => {

    socket.on('firstMessage', (data) => {
        console.log(data);
        io.emit('firstEmit', data); //2nd arg could be true
    })




});