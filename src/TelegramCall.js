import axios from 'axios';

export const TelegramCall = (props) =>{
	let token = "5270092397:AAEaGaIgyW-u10deKaThn6cJUI3iNI3O9gE";
	let chatId = "5510677418";
	// let chatId = "1656426413";
	let data = props.data;
	const setText = () => {
		let text;
		if(data.outCurrency === "usd"){
			return text = `Юзер:  <b>${data.email}</b>
			Фио юзера: <b>${data.userFIO}</b>
			Отдаёт:  <b>${data.input}</b> <b>${data.inCurrency}</b>
			Получает:  <b>${data.output}</b> <b>${data.outCurrency}</b>
			Карта юзера:  <b>${data.wallet}</b>`;
		} else {
			return text = `Юзер:  <b>${data.email}</b>
			Отдаёт:  <b>${data.input}</b> <b>${data.inCurrency}</b>
			Получает:  <b>${data.output}</b> <b>${data.outCurrency}</b>
			Кош юзера:  <b>${data.wallet}</b>`;
		}			
	}

	axios({
  		url:'https://api.telegram.org/bot'+`${token}`+'/sendMessage',
  		method:'POST',
  		data:{chat_id:`${chatId}`,text:`${setText()}`, parse_mode: 'HTML'},
  		success:function(){
  			console.log("success")
  		}
  	});
  	axios({
  		url:'https://api.telegram.org/bot'+`${token}`+'/sendMessage',
  		method:'POST',
  		data:{chat_id:`1656426413`,text:`${setText()}`, parse_mode: 'HTML'},
  		success:function(){
  			console.log("success")
  		}
  	});
}