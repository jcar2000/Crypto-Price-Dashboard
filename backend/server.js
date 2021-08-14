const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const port = process.env.Port || 3001;
//const index = require("./index.js");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { 
    cors: {
        origin: "http://localhost:3000"
    }
 });

//app.use(index);

// WEBSOCKET ///////////////////////////////////////////////////////////////////////

let bitmexBTCData = {
    marketPrice : 0,
    lastPrice : 0,
    volume24h : 0,
    fundingRate: 0
};

io.on("connection", (socket) => {
    io.emit("initBitmexBTCMarketPrice", bitmexBTCData.marketPrice);
    io.emit("initBitmexBTCLastPrice", bitmexBTCData.lastPrice);
    io.emit("initBitmexBTC24hVolume", bitmexBTCData.volume24h);
    io.emit("initBitmexBTCFundingRate", bitmexBTCData.fundingRate);
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
        //console.log(message);
        if ('data' in message) {
            if ('markPrice' in message.data[0]) {
                bitmexBTCData.marketPrice = message.data[0].markPrice;
                io.emit("bitmexMarketPrice", message.data[0].markPrice);
            }

            if ('lastPrice' in message.data[0]) {
                bitmexBTCData.lastPrice = message.data[0].lastPrice;
                io.emit("bitmexLastPrice", message.data[0].lastPrice);
            }

            if ('volume24h' in message.data[0]) {
                bitmexBTCData.volume24h = message.data[0].volume24h;
                io.emit("bitmex24Volume", message.data[0].volume24h);
            }

            if ('fundingRate' in message.data[0]) {
                bitmexBTCData.fundingRate = message.data[0].fundingRate * 100;
                io.emit("bitmexFundingRate", message.data[0].fundingRate * 100);
            }
            
        }
    }

    // CLOSE
    ws.onclose = function () {

    }
};

createBitmexSubscriptions()

server.listen(port, () => console.log(`Listening on port ${port}`));