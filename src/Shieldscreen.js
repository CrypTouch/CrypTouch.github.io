import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {WALLETS} from './wallets.js';
import exchangeMech from './exchangeMech.js';
import FinalScreen from './FinalScreen.js'
import {TelegramCall} from './TelegramCall';
import './App.css';
import './Secondaries.css';

function Shieldscreen(data) {

  let shieldscreen = useRef(null);
  let timerDisplay = useRef(null);
  let QRDisplay = useRef(null);
  let inCurrencySHORT = useRef(null);
  let thirtyMinutes = 60 * 30;
  let interval;
  let DATA = data.data;
  let currencyIcons = [
    "currencyIconLTC",
    "currencyIconXTZ",
    "currencyIconBTC",
    "currencyIconZEC",
    "currencyIconXRP",
    "currencyIconXLM",
    "currencyIconTRX",
    "currencyIconETH",
  ];
  let wallets = WALLETS();


  var observer = new MutationObserver((mutations) => {
    mutations.forEach((mutationRecord) => {
      walletAssighner();
      clearInterval(interval);
      if(shieldscreen.current.style.display === "flex"){
        startTimer(thirtyMinutes, timerDisplay.current)
        shortAssighner();
        iconAssighner();
      }
    })
  })

  var timerObserver = new MutationObserver((timerTicks) => {
    timerTicks.forEach((ticksRecord) => {
      let timerTime = ticksRecord.target.innerText;
      let closeButton = document.getElementById("close");
        if(timerTime === "29:59"){
          closeButton.style.opacity = "0.4";
          closeButton.style.pointerEvents = "none";
        }else if(timerTime === "28:59"){ 
          closeButton.style.pointerEvents = "all"
          closeButton.style.opacity = "1";
        }else if(timerTime === "00:00"){
          ticksRecord.target.style.fontSize = "20px"
          timerTime = "Время заявки окончено - создайте новую заявку"
        }
    })
  })




  useEffect((e) => {
    observer.observe(shieldscreen.current, { attributes : true, attributeFilter : ['style'] })
  }, []);

  useEffect((e) => {
    timerObserver.observe(timerDisplay.current, { childList: true})
  }, []);

  const closeModal = () => {
    shieldscreen.current.style.display = "none"
  };

  const walletAssighner = ()=>{
    let walletSpace = document.querySelector("#walletSpace");
    walletSpace.textContent = `КОШЕЛЁК ДЛЯ ОПЛАТЫ: `;
    let selectedOutCurrency = document.getElementById('outCurrency').innerText
    let wallets = WALLETS();
    walletSpace.innerText = `КОШЕЛЁК ДЛЯ ОПЛАТЫ: ` + ` ${wallets[selectedOutCurrency]}`;
  }

  const iconAssighner = ()=>{
    let selectedInCurrency = document.getElementById('inCurrency').innerText
    let selectedOutCurrency = document.getElementById('outCurrency').innerText
    let spanIN = document.getElementById('iconIN');
    let spanOUT =  document.getElementById('iconOUT');
    
    spanIN.className = "icon-modal-input";
    spanOUT.className = "icon-modal-output";
    switch(selectedInCurrency){
      case"litecoin":
        spanIN.classList.add("currencyIconLTC")
      break;
      case"tezos":
        spanIN.classList.add("currencyIconXTZ")
      break;
      case"bitcoin":
        spanIN.classList.add("currencyIconBTC")
      break;
      case"zcash":
        spanIN.classList.add("currencyIconZEC")
      break;
      case"ripple":
        spanIN.classList.add("currencyIconXRP")
      break;
      case"stellar":
        spanIN.classList.add("currencyIconXLM")
      break;
      case"tron":
        spanIN.classList.add("currencyIconTRX")
      break;
      case"ethereum":
        spanIN.classList.add("currencyIconETH")
      break;
    };
    switch(selectedOutCurrency){
      case"litecoin":
        spanOUT.classList.add("currencyIconLTC")
      break;
      case"tezos":
        spanOUT.classList.add("currencyIconXTZ")
      break;
      case"bitcoin":
        spanOUT.classList.add("currencyIconBTC")
      break;
      case"zcash":
        spanOUT.classList.add("currencyIconZEC")
      break;
      case"ripple":
        spanOUT.classList.add("currencyIconXRP")
      break;
      case"stellar":
        spanOUT.classList.add("currencyIconXLM")
      break;
      case"tron":
        spanOUT.classList.add("currencyIconTRX")
      break;
      case"ethereum":
        spanOUT.classList.add("currencyIconETH")
      break;
    };
  };
  const shortAssighner = () => {
    let selectedInCurrency = document.getElementById('inCurrency').innerText
    let CurrencySHORT = inCurrencySHORT.current;
    switch(selectedInCurrency){
      case"litecoin":
        CurrencySHORT.innerText = `СУММА: ${DATA.input} LTC`
      break;
      case"tezos":
        CurrencySHORT.innerText = `СУММА: ${DATA.input} XTZ`
      break;
      case"bitcoin":
        CurrencySHORT.innerText = `СУММА: ${DATA.input} BTC`
      break;
      case"zcash":
        CurrencySHORT.innerText = `СУММА: ${DATA.input} ZEC`
      break;
      case"ripple":
        CurrencySHORT.innerText = `СУММА: ${DATA.input} XRP`
      break;
      case"stellar":
        CurrencySHORT.innerText = `СУММА: ${DATA.input} XLM`
      break;
      case"tron":
        CurrencySHORT.innerText = `СУММА: ${DATA.input} TRX`
      break;
      case"ethereum":
        CurrencySHORT.innerText = `СУММА: ${DATA.input} ETH`
      break;
    };
  };

  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
      interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
  }

  function ExchangeNOW(e){
    e.preventDefault();
    TelegramCall(data);
    clearInterval(interval);
    closeModal();
    document.querySelector("#FinalScreen").style.display = "flex";
  }

  return (
    <div id="Shieldscreen" className="Shieldscreen" ref={shieldscreen}>
      <form className="modal" onSubmit={(e) =>{ExchangeNOW(e)}}>
        <div className="modal-header">
          <h1>Подтвердите оплату</h1>
          <span id="close" className="modal-close" onClick={(e) => {closeModal()}} ></span>
        </div>
        <div className="modal-body">
          <div className="modal-inputs">
            <div>
              <input disabled='disabled' value={DATA.input} type="number" step="any" name="modal-calc-in" id="modal-input" className="modal-input"></input>
              <span id="iconIN" className="icon-modal-input"></span>
            </div>
            <span className="arrowDown"></span>
            <div>
              <input disabled='disabled' value={DATA.output} type="number" step="any" name="modal-calc-out" id="modal-output" className="modal-input"></input>
              <span id="iconOUT" className="icon-modal-output"></span>
            </div>
          </div>
          <div className="checkout-info">
            <p id="inCurrency">{DATA.inCurrency}</p>
            <p id="outCurrency">{DATA.outCurrency}</p>
            <h2>Произведите оплату в течение: <span className="modal-timer" id="time" width="100px" height="50px" ref={timerDisplay}>30:00</span></h2>
            <p>После оплаты не забудьте нажать кнопку 'Я оплатил', в противном случае ваша заявка может затеряться, и нам понадобится время, чтобы обработать ее в ручную.</p>
            <div className="info-list-wrap">
              <h2>Реквизиты для оплаты:</h2>
              <ul className="checkout-info-list">
                <li>
                  <p id="walletSpace"></p>
                </li>
                <li>
                  <p ref={inCurrencySHORT}></p>
                </li>
                <li>
                  <p>QR-код (адрес криптовалюты):</p>
                  <img src={`http://api.qrserver.com/v1/create-qr-code/?data=${wallets[DATA.outCurrency]}&size=250x250`} ref={QRDisplay}></img>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
          <div className="modal-footer">
            <button id="checkout-submit" className="checkout-submit" type="submit">Я оплатил!</button>
        </div>
      </form>
    </div>
  );
}

export default Shieldscreen;
