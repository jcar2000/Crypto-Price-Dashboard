import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Card  from 'react-bootstrap/Card';
import chart from "./Images/chart.png";


const ENDPOINT = "localhost:3001";
const socket = socketIOClient(ENDPOINT);


function App() {
  const [bitmexMarketPrice, setBitmexMarketPrice] = useState(0);
  const [bitmexAskPrice, setBitmexAskPrice] = useState(0);
  const [bitmex24Volume, setBitmex24Volume] = useState(0);
  
  useEffect(() => {
    // DATA INITITALIZE
    socket.on("initBitmexBTCMarketPrice", price => {
      console.log('init bitmex market price');
      setBitmexMarketPrice(price.toFixed(2));
    });

    socket.on("initBitmexBTCAskPrice", price => {
      console.log('init bitmex ask price');
      setBitmexAskPrice(price.toFixed(2));
    });

    socket.on("initBitmexBTC24hVolume", volume => {
      console.log("init bitmex 24h volume");
      setBitmex24Volume(volume);
    }); 

    // DATA UPDATES
    socket.on("bitmexMarketPrice", price => {
      console.log('new bitmex market price');
      setBitmexMarketPrice(price.toFixed(2));
    });

    socket.on("bitmexAskPrice", price => {
      console.log("new bitmex ask price");
      setBitmexAskPrice(price.toFixed(2));
    }); 

    socket.on("bitmex24Volume", volume => {
      console.log("new bitmex 24h volume");
      setBitmex24Volume(volume);
    }); 
  }, []);  
  
  return (
      <div className="dashboardMain">
        <h1>BTC-USD</h1>
        <div className="exchangesDiv">
          <Card>
            <Card.Title>BITMEX</Card.Title>
            <Card.Title>${bitmexAskPrice.toLocaleString("en-US")}</Card.Title>
            <Card.Text>Mark: ${bitmexMarketPrice.toLocaleString("en-US")}</Card.Text>
            <Card.Img src={chart}/>
            <Card.Text>24h Volume: ${bitmex24Volume.toLocaleString("en-US")}</Card.Text>

          </Card>
        </div>
      </div>
  );
}

export default App;
