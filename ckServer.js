const express = require("express");
const app = express();
const port = 8505;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));

server.listen(port, () => {
    console.log("Server has started! :)")
})
//ljksdfjhlsdlk
//lksdfjklslkdfjklsdfkl
io.on('connection', (socket) => {




});