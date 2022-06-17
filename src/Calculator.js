import React, { useState, useEffect } from 'react';
import { CoinGeckoClient } from 'coingecko-api-v3';
import axios from 'axios';

export const Calculator = (currencyIn, currencyOut, DATA, setInput, setOutput, event) =>{
		let	calcIN = document.getElementById('calc-in').value;
		let calcOUT = document.getElementById('calc-out').value;
		let coinIN = DATA.find(x => x.id === currencyIn);
		let coinOUT = DATA.find(x => x.id === currencyOut);
		let coinPriceIn = coinIN.market_data.current_price.usd;
		let priceForAmountIN;
		let priceForAmountOUT;
		if (currencyOut === "usd") {
			switch(true){
      			case event.classList.contains('in-list-element') && (calcIN > 0):
      				priceForAmountIN = coinPriceIn * calcIN
   					setOutput(priceForAmountIN.toFixed(2))
      			break;
      			case event.id === 'calc-in' && (calcIN > 0):
      				priceForAmountIN = coinPriceIn * calcIN;
      			  	setOutput(priceForAmountIN.toFixed(2))
      			break;
      			case event.classList.contains('out-list-element') && (calcOUT > 0):
      				priceForAmountIN = coinPriceIn * calcIN;
      			  	setOutput(priceForAmountIN.toFixed(2))
      			break;
      			case event.id === 'calc-out' && (calcOUT > 0):
      				priceForAmountOUT = calcOUT/coinPriceIn
      			  	setInput(priceForAmountOUT.toFixed(8))
      			break;
    		}

		} else if(currencyOut !== "usd"){
			let coinPriceOut = coinOUT.market_data.current_price.usd;
			switch(true){
      			case event.classList.contains('in-list-element') && (calcIN > 0):
      				priceForAmountIN = coinPriceIn * calcIN;
      				priceForAmountOUT = coinPriceOut;
      			  	setOutput((priceForAmountIN / priceForAmountOUT).toFixed(8))
      			break;
      			case event.id === 'calc-in' && (calcIN > 0):
      				priceForAmountIN = coinPriceIn * calcIN;
      				priceForAmountOUT = coinPriceOut;
      			  	setOutput((priceForAmountIN / priceForAmountOUT).toFixed(8))
      			break;
      			case event.classList.contains('out-list-element') && (calcOUT > 0):
      				priceForAmountIN = coinPriceIn * calcIN;
      				priceForAmountOUT = coinPriceOut;
      			  	setOutput((priceForAmountIN / priceForAmountOUT).toFixed(8))
      			break;
      			case event.id === 'calc-out' && (calcOUT > 0):
      				priceForAmountOUT = coinPriceOut * calcOUT;
      				priceForAmountIN = coinPriceIn;
      			  	setInput((priceForAmountOUT / priceForAmountIN).toFixed(8))
      			break;
    		}
		}
    		
}