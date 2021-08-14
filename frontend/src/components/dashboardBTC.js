import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboardBTC.css';
import { Card } from 'react-bootstrap';
import link from "../Images/link.png"
import TradingViewWidget, { Themes } from 'react-tradingview-widget';


const ENDPOINT = "localhost:3001";
const socket = socketIOClient(ENDPOINT);


function DashboardBTC() {
  const [bitmexMarketPrice, setBitmexMarketPrice] = useState(0);
  const [bitmexLastPrice, setBitmexLastPrice] = useState(0);
  const [bitmex24Volume, setBitmex24Volume] = useState(0);
  const [bitmexFundingRate, setBitmexFundingRate] = useState(0);
  
  useEffect(() => {
    // DATA INITITALIZE ////////////////////////////
    socket.on("initBitmexBTCMarketPrice", price => {
      console.log('init bitmex market price');
      setBitmexMarketPrice(price);
    });

    socket.on("initBitmexBTCLastPrice", price => {
      console.log('init bitmex last price');
      setBitmexLastPrice(price);
    });

    socket.on("initBitmexBTC24hVolume", volume => {
      console.log("init bitmex 24h volume");
      setBitmex24Volume(volume);
    }); 

    socket.on("initBitmexBTCFundingRate", rate => {
      console.log("init bitmex funding rate");
      setBitmexFundingRate(rate);
    }); 


    // DATA UPDATES ///////////////////////////////
    socket.on("bitmexMarketPrice", price => {
      console.log('new bitmex market price');
      setBitmexMarketPrice(price);
    });

    socket.on("bitmexLastPrice", price => {
      console.log("new bitmex last price");
      setBitmexLastPrice(price);
    }); 

    socket.on("bitmex24Volume", volume => {
      console.log("new bitmex 24h volume");
      setBitmex24Volume(volume);
    }); 

    socket.on("bitmexFundingRate", rate => {
      console.log("new bitmex funding rate");
      setBitmexFundingRate(rate);
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
            <Card.Title>${bitmexLastPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Title>
            <Card.Text>Mark: ${bitmexMarketPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Text>
            
            <div className="chartContainer">
              <TradingViewWidget 
                symbol="BINANCE:BTCUSDT"
                theme={Themes.DARK}
                interval="1"
                timezone="Australia/Sydney"
                hide_legend={true}
                hide_top_toolbar={true}
                autosize
              />
            </div>

            <Card.Text>24h Volume: ${bitmex24Volume.toLocaleString("en-US")} <br/> </Card.Text>
          </Card>

          <Card>
            <a href="https://trading.bitfinex.com/t/BTC:USD?type=exchange" target="_blank" rel="noreferrer">
              <img className="linkImage" src={link} alt=''/>
            </a>
            <Card.Title><strong>BITFINEX</strong></Card.Title>
            <Card.Title>${bitmexLastPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Title>
            <Card.Text>Mark: ${bitmexMarketPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Text>
            
            <div className="chartContainer">
              <TradingViewWidget 
                symbol="BITFINEX:BTCUSD"
                theme={Themes.DARK}
                interval="1"
                timezone="Australia/Sydney"
                hide_legend={true}
                hide_top_toolbar={true}
                autosize
              />
            </div>

            <Card.Text>24h Volume: ${bitmex24Volume.toLocaleString("en-US")} <br/> </Card.Text>
          </Card>

          <Card>
            <a href="https://www.bitmex.com/app/trade/XBTUSD" target="_blank" rel="noreferrer">
              <img className="linkImage" src={link} alt=''/>
            </a>
            <Card.Title><strong>BITMEX</strong></Card.Title>
            <Card.Title>${bitmexLastPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Title>
            <Card.Text>Mark: ${bitmexMarketPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Text>
            
            <div className="chartContainer">
              <TradingViewWidget 
                symbol="BITMEX:XBTUSD"
                theme={Themes.DARK}
                interval="1"
                timezone="Australia/Sydney"
                hide_legend={true}
                hide_top_toolbar={true}
                autosize
              />
            </div>

            <Card.Text>
              24h Volume: ${bitmex24Volume.toLocaleString("en-US")} <br/> 
              Funding Rate: {bitmexFundingRate}% 
            </Card.Text>

          </Card>

          <Card>
            <a href="https://pro.coinbase.com/trade/BTC-USD" target="_blank" rel="noreferrer">
              <img className="linkImage" src={link} alt=''/>
            </a>
            <Card.Title><strong>COINBASE</strong></Card.Title>
            <Card.Title>${bitmexLastPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Title>
            <Card.Text>Mark: ${bitmexMarketPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Text>
            
            <div className="chartContainer">
              <TradingViewWidget 
                symbol="COINBASE:BTCUSD"
                theme={Themes.DARK}
                interval="1"
                timezone="Australia/Sydney"
                hide_legend={true}
                hide_top_toolbar={true}
                autosize
              />
            </div>

            <Card.Text>24h Volume: ${bitmex24Volume.toLocaleString("en-US")} <br/> </Card.Text>
          </Card>

          <Card>
            <a href="https://www.deribit.com/main#/futures?tab=BTC-PERPETUAL" target="_blank" rel="noreferrer">
              <img className="linkImage" src={link} alt=''/>
            </a>
            <Card.Title><strong>DERIBIT</strong></Card.Title>
            <Card.Title>${bitmexLastPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Title>
            <Card.Text>Mark: ${bitmexMarketPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Text>
            
            <div className="chartContainer">
              <TradingViewWidget 
                symbol="DERIBIT:BTCPERP"
                theme={Themes.DARK}
                interval="1"
                timezone="Australia/Sydney"
                hide_legend={true}
                hide_top_toolbar={true}
                autosize
              />
            </div>

            <Card.Text>24h Volume: ${bitmex24Volume.toLocaleString("en-US")} <br/> </Card.Text>
          </Card>

          <Card>
            <a href="https://ftx.com/trade/BTC-PERP" target="_blank" rel="noreferrer"> 
              <img className="linkImage" src={link} alt=''/>
            </a>
            <Card.Title><strong>FTX</strong></Card.Title>
            <Card.Title>${bitmexLastPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Title>
            <Card.Text>Mark: ${bitmexMarketPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Text>
            
            <div className="chartContainer">
              <TradingViewWidget 
                symbol="FTX:BTCPERP"
                theme={Themes.DARK}
                interval="1"
                timezone="Australia/Sydney"
                hide_legend={true}
                hide_top_toolbar={true}
                autosize
              />
            </div>

            <Card.Text>24h Volume: ${bitmex24Volume.toLocaleString("en-US")} <br/> </Card.Text>
          </Card>
 
          <Card>
            <a href="https://www.huobi.com.au/exchange/#s=btc_usdt&p=symbol_usdt" target="_blank" rel="noreferrer">
              <img className="linkImage" src={link} alt=''/>
            </a>
            <Card.Title><strong>HUOBI</strong></Card.Title>
            <Card.Title>${bitmexLastPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Title>
            <Card.Text>Mark: ${bitmexMarketPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Text>
            
            <div className="chartContainer">
              <TradingViewWidget 
                symbol="HUOBI:BTCPERP"
                theme={Themes.DARK}
                interval="1"
                timezone="Australia/Sydney"
                hide_legend={true}
                hide_top_toolbar={true}
                autosize
              />
            </div>

            <Card.Text>24h Volume: ${bitmex24Volume.toLocaleString("en-US")} <br/> </Card.Text>
          </Card>
 
          <Card>
            <a href="https://www.okex.com/trade-spot/btc-usdt" target="_blank" rel="noreferrer">
              <img className="linkImage" src={link} alt=''/>
            </a>
            <Card.Title><strong>OKEX</strong></Card.Title>
            <Card.Title>${bitmexLastPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Title>
            <Card.Text>Mark: ${bitmexMarketPrice.toLocaleString("en-US", {'minimumFractionDigits':2})}</Card.Text>
            
            <div className="chartContainer">
              <TradingViewWidget 
                symbol="OKEX:BTCUSDPERP"
                theme={Themes.DARK}
                interval="1"
                timezone="Australia/Sydney"
                hide_legend={true}
                hide_top_toolbar={true}
                autosize
              />
            </div>

            <Card.Text>24h Volume: ${bitmex24Volume.toLocaleString("en-US")} <br/> </Card.Text>
          </Card>
 
        </div>
      </div>
  );
}

export default DashboardBTC;
