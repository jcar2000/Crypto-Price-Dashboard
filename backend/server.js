const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const port = process.env.Port || 3001;
const index = require("./index.js");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIO(server, { 
    cors: {
        origin: "http://localhost:3000"
    }
 });


io.on("connection", (socket) => {
    
});


server.listen(port, () => console.log(`Listening on port ${port}`));