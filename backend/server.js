const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const port = process.env.Port || 3001;
const index = require("./index.js");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { 
    cors: {
        origin: "http://localhost:3000"
    }
 });

app.use(index);

// WEBSOCKET ///////////////////////////////////////////////////////////////////////
let bitmexBTCMarket = 0;
let bitmexBTC24Volume = 0;

io.on("connection", (socket) => {
    io.emit("initBitmexBTCMarketPrice", bitmexBTCMarket);
    io.emit("initBitmexBTC24hVolume", bitmexBTC24Volume);
});

function createBitmexSubscriptions() {
    let ws = new WebSocket('wss://www.bitmex.com/realtime');

    // OPEN
    ws.onopen = function () {
        let btcPrice = {
            "op": "subscribe",
            "args": ["instrument:XBTUSD"]
        };

        ws.send(JSON.stringify(btcPrice));
    }

    // MESSAGE
    ws.onmessage = function (message) {
        message = JSON.parse(message.data);
        if ('data' in message) {
            if ('markPrice' in message.data[0]) {
                bitmexBTCMarket = message.data[0].markPrice;
                io.emit("bitmexMarketPrice", message.data[0].markPrice);
            }

            if ('volume24h' in message.data[0]) {
                bitmexBTC24Volume = message.data[0].volume24h;
                io.emit("bitmex24Volume", message.data[0].volume24h);
            }
        }
    }

    // CLOSE
    ws.onclose = function () {

    }
};

createBitmexSubscriptions()

server.listen(port, () => console.log(`Listening on port ${port}`));