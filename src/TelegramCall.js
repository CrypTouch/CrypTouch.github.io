import axios from 'axios';

export const TelegramCall = (props) =>{
	let token = "5270092397:AAEaGaIgyW-u10deKaThn6cJUI3iNI3O9gE";
	let chatId = "5510677418";
	let data = props.data;
	let text = `Юзер:  <b>${data.email}</b>
			Отдаёт:  <b>${data.input}</b> <b>${data.inCurrency}</b>
			Получает:  <b>${data.output}</b> <b>${data.outCurrency}</b>
			Кош юзера:  <b>${data.wallet}</b>`;

	axios({
  		url:'https://api.telegram.org/bot'+`${token}`+'/sendMessage',
  		method:'POST',
  		data:{chat_id:`${chatId}`,text:`${text}`, parse_mode: 'HTML'},
  		success:function(){
  		}
  	});
}