const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const port = process.env.Port || 3001;
const index = require("./index.js");
const WebSocket = require("ws");

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

function createBitmexSubscriptions() {
    let ws = new WebSocket('wss://www.bitmex.com/realtime');

    ws.onopen = function () {
        let btcPrice = {
            "op": "subscribe",
            "args": ["instrument:XBTUSD"]
        };

        ws.send(JSON.stringify(btcPrice));
    }

    ws.onmessage = function (message) {
        message = JSON.parse(message.data);
        if ('data' in message) {
            if ('markPrice' in message.data[0]) {
                io.emit("marketPrice", message.data[0].markPrice);
            }   
        }
    }

    ws.onclose = function () {

    }
};

createBitmexSubscriptions()

server.listen(port, () => console.log(`Listening on port ${port}`));