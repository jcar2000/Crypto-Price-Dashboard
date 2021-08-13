import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Card } from 'react-bootstrap';
import chart from "./Images/chart.png";
import link from "./Images/link.png"


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
      setBitmexMarketPrice(price);
    });

    socket.on("initBitmexBTCAskPrice", price => {
      console.log('init bitmex ask price');
      setBitmexAskPrice(price);
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

    socket.on("bitmexAskPrice", price => {
      console.log("new bitmex ask price");
      setBitmexAskPrice(price);
    }); 

    socket.on("bitmex24Volume", volume => {
      console.log("new bitmex 24h volume");
      setBitmex24Volume(volume);
    }); 
  }, []);  
  
  return (
      <div className="dashboardMain">
        <h1>BTC-USD</h1>
        <div className="exchangesContainer">

          <Card>
            <a href="https://www.binance.com/en/trade/BTC_USDT?layout=pro" target="_blank" rel="noreferrer">
              <img className="linkImage" src={link} alt=''/>
            </a>
            <Card.Title><strong>BINANCE</strong></Card.Title>
            <Card.Title>${bitmexAskPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Title>
            <Card.Text>Mark: ${bitmexMarketPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Text>
            <Card.Img src={chart}/>
            <Card.Text>24h Volume: ${bitmex24Volume.toLocaleString("en-US")} <br/> </Card.Text>
          </Card>

          <Card>
            <a href="https://trading.bitfinex.com/t/BTC:USD?type=exchange" target="_blank" rel="noreferrer">
              <img className="linkImage" src={link} alt=''/>
            </a>
            <Card.Title><strong>BITFINEX</strong></Card.Title>
            <Card.Title>${bitmexAskPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Title>
            <Card.Text>Mark: ${bitmexMarketPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Text>
            <Card.Img src={chart}/>
            <Card.Text>24h Volume: ${bitmex24Volume.toLocaleString("en-US")} <br/> </Card.Text>
          </Card>

          <Card>
            <a href="https://www.bitmex.com/app/trade/XBTUSD" target="_blank" rel="noreferrer">
              <img className="linkImage" src={link} alt=''/>
            </a>
            <Card.Title><strong>BITMEX</strong></Card.Title>
            <Card.Title>${bitmexAskPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Title>
            <Card.Text>Mark: ${bitmexMarketPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Text>
            <Card.Img src={chart}/>
            <Card.Text>24h Volume: ${bitmex24Volume.toLocaleString("en-US")} <br/> </Card.Text>
          </Card>

          <Card>
            <a href="https://pro.coinbase.com/trade/BTC-USD" target="_blank" rel="noreferrer">
              <img className="linkImage" src={link} alt=''/>
            </a>
            <Card.Title><strong>COINBASE</strong></Card.Title>
            <Card.Title>${bitmexAskPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Title>
            <Card.Text>Mark: ${bitmexMarketPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Text>
            <Card.Img src={chart}/>
            <Card.Text>24h Volume: ${bitmex24Volume.toLocaleString("en-US")} <br/> </Card.Text>
          </Card>

          <Card>
            <a href="https://www.deribit.com/main#/futures?tab=BTC-PERPETUAL" target="_blank" rel="noreferrer">
              <img className="linkImage" src={link} alt=''/>
            </a>
            <Card.Title><strong>DERIBIT</strong></Card.Title>
            <Card.Title>${bitmexAskPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Title>
            <Card.Text>Mark: ${bitmexMarketPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Text>
            <Card.Img src={chart}/>
            <Card.Text>24h Volume: ${bitmex24Volume.toLocaleString("en-US")} <br/> </Card.Text>
          </Card>

          <Card>
            <a href="https://ftx.com/trade/BTC-PERP" target="_blank" rel="noreferrer"> 
              <img className="linkImage" src={link} alt=''/>
            </a>
            <Card.Title><strong>FTX</strong></Card.Title>
            <Card.Title>${bitmexAskPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Title>
            <Card.Text>Mark: ${bitmexMarketPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Text>
            <Card.Img src={chart}/>
            <Card.Text>24h Volume: ${bitmex24Volume.toLocaleString("en-US")} <br/> </Card.Text>
          </Card>
 
          <Card>
            <a href="https://www.huobi.com.au/exchange/#s=btc_usdt&p=symbol_usdt" target="_blank" rel="noreferrer">
              <img className="linkImage" src={link} alt=''/>
            </a>
            <Card.Title><strong>HUOBI</strong></Card.Title>
            <Card.Title>${bitmexAskPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Title>
            <Card.Text>Mark: ${bitmexMarketPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Text>
            <Card.Img src={chart}/>
            <Card.Text>24h Volume: ${bitmex24Volume.toLocaleString("en-US")} <br/> </Card.Text>
          </Card>
 
          <Card>
            <a href="https://www.okex.com/trade-spot/btc-usdt" target="_blank" rel="noreferrer">
              <img className="linkImage" src={link} alt=''/>
            </a>
            <Card.Title><strong>OKEX</strong></Card.Title>
            <Card.Title>${bitmexAskPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Title>
            <Card.Text>Mark: ${bitmexMarketPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Text>
            <Card.Img src={chart}/>
            <Card.Text>24h Volume: ${bitmex24Volume.toLocaleString("en-US")} <br/> </Card.Text>
          </Card>
 
        </div>
      </div>
  );
}

export default App;
