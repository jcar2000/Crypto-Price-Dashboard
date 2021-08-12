import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
//import './App.css';
const ENDPOINT = "localhost:3001";
const socket = socketIOClient(ENDPOINT);

function App() {
  const [bitmexPrice, setBitmexPrice] = useState(0);
  
  useEffect(() => {
    socket.on("marketPrice", price => {
      console.log('recieved message');
      setBitmexPrice(price);
    });
  }, []);  
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Current Bitmex Price : ${bitmexPrice}</h1>
      </header>
    </div>
  );
}

export default App;
