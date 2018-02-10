module.exports.replyAll = function (doc){
	let replyStr = `📅<b>${doc.title}</b>\r\n`;
	doc.data.forEach((el)=>{
		let startDate = moment.unix(el.startDate/1000).format('HH:MM');
		let endDate = moment.unix(el.stopDate/1000).format('HH:MM');
		let theme = el.theme===null ? 'нет' : el.theme;
		let homework = el.homework===null ? 'нет' : el.homework;
		let irs =
    `${el.number}) <b>${el.subject.name}</b> ⏰ ${startDate}-${endDate}
    💡Тема: ${theme}
    📗Дом.работа:${homework}\n`;
		replyStr = replyStr + irs;
	});
	return replyStr;
};
module.exports.replyTheme = function (doc){
	let replyStr = `📅<b>${doc.title}</b>\r\n`;
	doc.data.forEach((el)=>{
		let theme = el.theme===null ? 'нет' : el.theme;
		let irs =
    `${el.number}) <b>${el.subject.name}</b> ⏰ ${startDate}-${endDate}
    💡Тема: ${theme}`;
		replyStr = replyStr + irs;
	});
	return replyStr;
};
module.exports.replySchedule = function (doc){
	let replyStr = `📅<b>${doc.title}</b>\r\n`;
	doc.data.forEach((el)=>{
		let startDate = moment.unix(el.startDate/1000).format('HH:MM');
		let endDate = moment.unix(el.stopDate/1000).format('HH:MM');
		let irs =
    `${el.number}) <b>${el.subject.name}</b>
    ⏰ ${startDate}-${endDate}`;
		replyStr = replyStr + irs;
	});
	return replyStr;
};
