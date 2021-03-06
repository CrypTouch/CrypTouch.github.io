import React, { useState, useEffect } from 'react';
import {Calculator} from './Calculator.js';
import Shieldscreen from './Shieldscreen.js';
import Rules from './rules.js';
import { CoinGeckoClient } from 'coingecko-api-v3';
import axios from 'axios';
import './App.css';
window.Buffer = window.Buffer || require("buffer").Buffer;
var WAValidator = require('multicoin-address-validator');
var luhn = require("luhn");

const ExchangeMech = () => {

  const [POST, setPOST] = useState([]);

  const [selectedInCurrency, selectCurrencyIn] = useState('litecoin');
  const [selectedOutCurrency, selectCurrencyOut] = useState('litecoin');
  const [giveInput, setInput] = useState('1');
  const [getOutput, setOutput] = useState('1'); 
  const [userEmail, setUserEmail] = useState('');
  const [userFIO, setUserFIO] = useState('');
  const [userWalletProvided, setUserWalletProvided] = useState('');

  let payWalletField = document.getElementById("pay-wallet");
  let payWalletLabel = document.getElementById("pay-wallet-label");

  useEffect(() => {
      axios.all([
        axios.get(`https://api.coingecko.com/api/v3/coins/litecoin`),
        axios.get(`https://api.coingecko.com/api/v3/coins/tezos`),
        axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin`),
        axios.get(`https://api.coingecko.com/api/v3/coins/zcash`),
        axios.get(`https://api.coingecko.com/api/v3/coins/ripple`),
        axios.get(`https://api.coingecko.com/api/v3/coins/stellar`),
        axios.get(`https://api.coingecko.com/api/v3/coins/tron`),
        axios.get(`https://api.coingecko.com/api/v3/coins/ethereum`),
      ])
      .then(axios.spread((dataLTC, dataTZC, dataBTC, dataZEC, dataXRP, dataXLM, dataTRX, dataETH) => {
        setPOST([dataLTC.data, dataTZC.data, dataBTC.data, dataZEC.data, dataXRP.data, dataXLM.data, dataTRX.data, dataETH.data]);
      }))
  },[selectedInCurrency,selectedOutCurrency]);



  const ULTIMATEHANDLER = (event)=>{
      payWalletLabel.style.top = "0";
      payWalletLabel.style.display = "none";
      payWalletField.style.border = "1px solid #2b5278";

    if (event.target.id === "submit-text-button") {
        document.getElementById("Rules").style.display = "flex";
    }
    if (event !== undefined) {
      let eventTarget = event.target;
      if(eventTarget.localName === "span" && (eventTarget.parentNode.classList.contains("in-list-element") || eventTarget.parentNode.classList.contains("out-list-element"))){
        eventTarget = eventTarget.parentNode
      }
      outputCalc(selectedInCurrency,selectedOutCurrency, POST, setInput, setOutput, eventTarget);
    }
  };

  const outputCalc = (currencyIn, currencyOut, DATA, setInput, setOutput, e) => {
    if (e !== undefined) {
      Calculator(currencyIn, currencyOut, DATA, setInput, setOutput, e);
    }
  };

  const currencyGhoster = (selected, inCurrencyList, outCurrencyList) =>{
    inCurrencyList.forEach((el)=>{
        el.classList.remove("disabled")
        if(el.id.replace("-in","") === selected.id.replace("-out","")){
          el.classList.toggle("disabled")
        }
    })
    outCurrencyList.forEach((el)=>{
        el.classList.remove("disabled")
        if(el.id.replace("-out","") === selected.id.replace("-in","")){
          el.classList.toggle("disabled")
        }
    })
  };

  const currencyChecker = (e) => {
    let eventTarget = e.target;
    let inCurrencyList = Array.from(document.getElementsByClassName('in-list-element'));
    let outCurrencyList = Array.from(document.getElementsByClassName('out-list-element'));
    if(eventTarget.localName === "span" && (eventTarget.parentNode.classList.contains("in-list-element") || eventTarget.parentNode.classList.contains("out-list-element"))){
      eventTarget = eventTarget.parentNode
    }
    if (eventTarget.classList.contains("in-list-element") || eventTarget.classList.contains("out-list-element")){
      currencyGhoster(eventTarget, inCurrencyList, outCurrencyList);
    }
    if (!eventTarget.classList.contains("in-list-element-active") && eventTarget.classList.contains("in-list-element") && !eventTarget.classList.contains("disabled")) {
      inCurrencyList.forEach((el)=>{
        el.classList.remove("in-list-element-active")
        el.classList.remove("disabled")
      })
      eventTarget.classList.add("in-list-element-active") 
      selectCurrencyIn(eventTarget.id.replace("-in",""))
    };

    if(!eventTarget.classList.contains("out-list-element-active") && eventTarget.classList.contains("out-list-element") && !eventTarget.classList.contains("disabled")) {
      payWalletField.type = "text";
      outCurrencyList.forEach((el)=>{
        el.classList.remove("out-list-element-active")
        el.classList.remove("disabled")
        if(document.querySelector("#fullNameField")){
          document.querySelector("#fullNameField").remove();
        }
      })
      eventTarget.classList.add("out-list-element-active")
      selectCurrencyOut(eventTarget.id.replace("-out",""))
    };
  };

  const formDATA = (input,output,inCurrency,outCurrency,email,userFIO,wallet) =>{
    return {input,output,inCurrency,outCurrency,email,userFIO,wallet}
  }

  const handleSubmit = (e) => {  
    e.preventDefault(); 
    payWalletLabel.style.top = "0";
    payWalletLabel.style.display = "none";
    payWalletField.style.border = "1px solid #2b5278";
    if (selectedOutCurrency === "usd") {
      let validCard = luhn.validate(userWalletProvided.replace(/[^0-9]/g, ''));
      if(validCard){
        let shieldscreen = document.getElementById('Shieldscreen');
        setUserFIO(document.querySelector("#fullNameField").value)
        shieldscreen.style.display = "flex";
      }else{
        payWalletField.style.border = "1px solid red";
        payWalletLabel.style.display = "block";
        payWalletLabel.style.top = "48%";
        payWalletLabel.textContent = "???????????? ???????????? ?????????? ??????????!"
      }
    }else{
      let valid = WAValidator.validate(payWalletField.value, selectedOutCurrency);
      let shieldscreen = document.getElementById('Shieldscreen');
      if (valid) {
        if (selectedInCurrency === selectedOutCurrency) {
          payWalletField.style.border = "1px solid red";
          payWalletLabel.style.display = "block";
          payWalletLabel.textContent = `???? ???? ?????????? ?????????????? ${selectedInCurrency} ???? ${selectedOutCurrency}!`
        }else{
          shieldscreen.style.display = "flex";
        }
      }else{
        payWalletField.style.border = "1px solid red";
        payWalletLabel.style.display = "block";
        payWalletLabel.textContent = "?????????????? ???????????? ?????????? ????????????????!"
      }
    }

  };

  const usdOnclick = (e) => {
    payWalletField.placeholder = "?????????? ?????????? USD ??????????";
    payWalletField.type = "number"
    if(!document.querySelector("#fullNameField")){
      let parrent = document.querySelector(".exhange-calc-input-wallets")
      let fullNameField = document.createElement('input');
      parrent.style.flexDirection = "column"
      fullNameField.classList = "exchange-input exchange-input-requisit";
      fullNameField.id = "fullNameField";
      fullNameField.placeholder = "?????? ?????????????????? ??????????";
      fullNameField.required = "true";
      parrent.insertBefore(fullNameField, payWalletField)
    }
  };

  return(
    <span style = {{"minWidth":"100%","display":"flex","justifyContent":"center"}}>
      <form onSubmit = {handleSubmit} onMouseDown = {currencyChecker} className="Exchange">
        <div className="exchange-layout">
          <div>
            <label for="calc-in">??????????</label>
            <div className="exchange-inputs">
              <input required onWheel={e => e.target.blur()} value={giveInput} onChange={(e) => {setInput(e.target.value); ULTIMATEHANDLER(e)}}  placeholder="1000" type="number" step="any" name="calc-in" id="calc-in" className="exchange-input"></input>
              <span></span>
            </div>
          </div>
          <ul className="Currency-in-list" onClick={(e) => {ULTIMATEHANDLER(e)}}>
            <li id="litecoin-in" className="in-list-element in-list-element-active">
              <span className="currencyIconLTC"></span>
              <span>Litecoin</span>
            </li>
            <li id="tezos-in" className="in-list-element">
              <span className="currencyIconXTZ"></span>
              <span>Tezos</span>
            </li>
            <li id="bitcoin-in" className="in-list-element">
              <span className="currencyIconBTC"></span>
              <span>Bitcoin</span>
            </li>
            <li id="zcash-in" className="in-list-element">
              <span className="currencyIconZEC"></span>
              <span>Zcash</span>
            </li>
            <li id="ripple-in" className="in-list-element">
              <span className="currencyIconXRP"></span>
              <span>Ripple</span>
            </li>
            <li id="stellar-in" className="in-list-element">
              <span className="currencyIconXLM"></span>
              <span>Stellar</span>
            </li>
            <li id="tron-in" className="in-list-element">
              <span className="currencyIconTRX"></span>
              <span>TRON</span>
            </li>
            <li id="ethereum-in" className="in-list-element">
              <span className="currencyIconETH"></span>
              <span>Ethereum</span>
            </li>
          </ul>
        </div>
    
    
        <div className="exchange-layout">
          <div>
            <label for="calc-out">??????????????</label>
            <div className="exchange-inputs">
              <input required onWheel={e => e.target.blur()} value={getOutput} onChange={(e) => {setOutput(e.target.value); ULTIMATEHANDLER(e)}} type="number" step="any" name="calc-out" id="calc-out" className="exchange-input"></input>
              <span ></span>
            </div>
          </div>
          <ul className="Currency-out-list" onClick={(e) =>{ULTIMATEHANDLER(e)}}>
            <li id="usd-out" className="out-list-element" onClick={(e) => {usdOnclick(e)}}>
              <span className="currencyIconUSD"></span>
              <span>USD</span>
            </li>
            <li id="litecoin-out" className="out-list-element out-list-element-active">
              <span className="currencyIconLTC"></span>
              <span>Litecoin</span>
            </li>
            <li id="tezos-out" className="out-list-element">
              <span className="currencyIconXTZ"></span>
              <span>Tezos</span>
            </li>
            <li id="bitcoin-out" className="out-list-element">
              <span className="currencyIconBTC"></span>
              <span>Bitcoin</span>
            </li>
            <li id="zcash-out" className="out-list-element">
              <span className="currencyIconZEC"></span>
              <span>Zcash</span>
            </li>
            <li id="ripple-out" className="out-list-element">
              <span className="currencyIconXRP"></span>
              <span>Ripple</span>
            </li>
            <li id="stellar-out" className="out-list-element">
              <span className="currencyIconXLM"></span>
              <span>Stellar</span>
            </li>
            <li id="tron-out" className="out-list-element">
              <span className="currencyIconTRX"></span>
              <span>TRON</span>
            </li>
            <li id="ethereum-out" className="out-list-element">
              <span className="currencyIconETH"></span>
              <span>Ethereum</span>
            </li>
          </ul>
        </div>
    
    
        <div className="exchange-layout exchange-calc">
    
          <div>
            <p>???????? ????????????</p>
          </div>
    
          <div>
    
            <div className="exchange-inputs">
                <input disabled='disabled' value={giveInput}type="number" step="any" name="exchange-calc-in" id="exchange-calc-in" className="exchange-input-secondary"></input>
                <span ></span>
              </div>
              <div className="exchange-inputs">
                <input disabled='disabled' value={getOutput} type="number" step="any" name="exchange-calc-out" id="exchange-calc-out" className="exchange-input-secondary"></input>
                <span ></span>
              </div>
          </div>
    
          <div className="exchange-secondary-inputs">
            <div className="exhange-calc-input-email">
              <input required value={userEmail} onChange={(e) => setUserEmail(e.target.value)} type="email" className="exchange-input exchange-input-requisit" id="pay-email" placeholder="E-mail"/>
              <label for="pay-email" className="exchange-input-requisit-label"></label>
            </div>
      
            <div className="exhange-calc-input-wallets">
              <input required value={userWalletProvided} onChange={(e) => setUserWalletProvided(e.target.value)} placeholder={"?????? "+ selectedOutCurrency + " ??????????????"} type="text" className="exchange-input exchange-input-requisit" id="pay-wallet" />
              <label id="pay-wallet-label" for="pay-wallet" className="pay-wallet-label">?????????????? ???????????? ?????????? ????????????????!</label>
            </div>
          </div>
    
          <span className="exchange-submit">
            <button type='submit' className="exchange-input-submit" >Exchange</button>
            <p className="exchange-submit-text">?????????????? ???? ???????????? "?????????????? ?? ????????????", ?? ???????????????????? ?? <span id="submit-text-button" onClick={(e) =>{ULTIMATEHANDLER(e)}} className="submit-text-button">?????????????????? ????????????.</span></p>
          </span>
        </div>
        
      </form>
    <Rules/>
    <Shieldscreen data={formDATA(giveInput,getOutput,selectedInCurrency,selectedOutCurrency,userEmail,userFIO,userWalletProvided)} />
  </span>
  );
    
}

export default ExchangeMech;