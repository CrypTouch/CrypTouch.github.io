import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import './Secondaries.css';

function FinalScreen() {

	let finalScreen = useRef(null);

	const closeModal = () => {
  		finalScreen.current.style.display = "none"
  		document.location.reload();
	};
	
	return(
		<div id="FinalScreen" className="Shieldscreen" ref={finalScreen}>
			<div className="modal final-screen">
				<div className="modal-header">
          			<h1>Оплата подтверждена! Ожидаем минимум 1 подтверждение от блокчейна...</h1>
          			<span id="close" className="modal-close final-close" onClick={(e) => {closeModal()}} ></span>
        		</div>
        	</div>
		</div>
	)
}
export default FinalScreen