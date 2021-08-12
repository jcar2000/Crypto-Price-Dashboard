import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
//import './App.css';
const ENDPOINT = "localhost:3001";
const socket = socketIOClient(ENDPOINT);

function App() {
  const [bitmexMarketPrice, setBitmexMarketPrice] = useState(0);
  const [bitmex24Volume, setBitmex24Volume] = useState(0);
  
  useEffect(() => {
    // DATA INITITALIZE
    socket.on("initBitmexBTCMarketPrice", price => {
      console.log('init bitmex market price');
      setBitmexMarketPrice(price);
    });

    socket.on("initBitmexBTC24hVolume", volume => {
      console.log("init bitmex 24h volume");
      setBitmex24Volume(volume);
    }); 

    // DATA UPDATES
    socket.on("bitmexMarketPrice", price => {
      console.log('new bitmex market price');
      setBitmexMarketPrice(price);
    });

    socket.on("bitmex24Volume", volume => {
      console.log("new bitmex 24h volume");
      setBitmex24Volume(volume);
    }); 
  }, []);  
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Current Bitmex BTC Price : ${bitmexMarketPrice.toLocaleString("en-US")}</h1>
        <h2>Current Bitmex BTC 24h Volume : ${bitmex24Volume.toLocaleString("en-US")}</h2>
      </header>
    </div>
  );
}

export default App;
