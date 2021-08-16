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

let deribitBTCData = {
    marketPrice : 0,
    lastPrice : 0,
    volume24h : 0,
    fundingRate: 0
}

io.on("connection", (socket) => {
    io.emit("initBitmexBTCMarketPrice", bitmexBTCData.marketPrice);
    io.emit("initBitmexBTCLastPrice", bitmexBTCData.lastPrice);
    io.emit("initBitmexBTC24hVolume", bitmexBTCData.volume24h);
    io.emit("initBitmexBTCFundingRate", bitmexBTCData.fundingRate);

    io.emit("initDeribitBTCMarketPrice", deribitBTCData.marketPrice);
    io.emit("initDeribitBTCLastPrice", deribitBTCData.lastPrice);
    io.emit("initDeribitBTC24hVolume", deribitBTCData.volume24h);
    io.emit("initDeribitBTCFundingRate", deribitBTCData.fundingRate);
});


// BITMEX //
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


// DERIBIT //
function createDeribitSubscriptions() {
    let ws = new WebSocket('wss://www.deribit.com/ws/api/v2');

    // OPEN
    ws.onopen = function () {
        let btcData = {
            "jsonrpc": "2.0",
            "id": 0,
            "method": "public/subscribe",
            "params": {
                "channels": ["ticker.BTC-PERPETUAL.raw"]
            }
        };

        ws.send(JSON.stringify(btcData));
    }

    // MESSAGE
    ws.onmessage = function (message) {
        message = JSON.parse(message.data);
        //console.log(message);
        
        if ('params' in message) {
            if ('data' in message.params) {
                if ('mark_price' in message.params.data) {
                    if (message.params.data.mark_price != deribitBTCData.marketPrice) {
                        deribitBTCData.marketPrice = message.params.data.mark_price;
                        io.emit("deribitMarketPrice", message.params.data.mark_price);
                    }
                }

                if ('last_price' in message.params.data) {
                    if (message.params.data.last_price != deribitBTCData.lastPrice) {
                        deribitBTCData.lastPrice = message.params.data.last_price;
                        io.emit("deribitLastPrice", message.params.data.last_price);
                    }
                }

                if ('stats' in message.params.data) {
                    if (message.params.data.stats.volume_usd != deribitBTCData.volume24h) {
                        deribitBTCData.volume24h = message.params.data.stats.volume_usd;
                        io.emit("deribit24Volume", message.params.data.stats.volume_usd);
                    }
                }

                if ('current_funding' in message.params.data) {
                    if (message.params.data.current_funding * 100 != deribitBTCData.fundingRate) {
                        deribitBTCData.fundingRate = message.params.data.current_funding * 100;
                        io.emit("deribitFundingRate", message.params.data.current_funding * 100);
                    }
                }
            }    
        }
    }

    // CLOSE
    ws.onclose = function () {

    }
}


if (require.main === module) {
    // Open exchange websockets
    createBitmexSubscriptions();
    createDeribitSubscriptions();
}


server.listen(port, () => console.log(`Listening on port ${port}`));