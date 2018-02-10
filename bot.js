const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const bot = new Telegraf('521903905:AAHJf8mBwEEDZ-TcVq4PgIwuIN9Pupcy8i0');
const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');
moment().format();
moment.locale('ru');
const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'tbot';
const COLLECTION_NAME = 'diaryinfo';
console.log('bot starts');
/*
bot.start((ctx) => {
  console.log('started:', ctx.from.id)
  return ctx.reply('Welcome!')
})

MongoClient.connect(url).then(client=>{
    client.db(dbName)
      .collection(collectionName)
      .findOne({})
      .then(result=>{
        console.log(result);
      })
      .catch(
        (err)=>{
          console.log(err);
        }
      );
  });
*/
// https://t.me/VCLI_BOT?start=buy-200300      :tada:
let MongoHelper = function (dbURL, dbName, collectionName){
	return new Promise((resolve, reject)=>{
		MongoClient.connect(dbURL, function (err, client) {
			if(err!==null){
				reject(err);
			}
			let db = client.db(dbName);
			let collection = db.collection(collectionName);
			resolve(collection);
		});
	});
};

function reply1(doc){
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
}

/*let MongoConnect = function (url) {
  MongoClient.connect(url)
}*/
bot.hears(/(start)-(\d+)-(\d+)/i, (ctx) => {
	let dayNom = parseInt(ctx.match[3]);
	let studentID = ctx.match[2];
	MongoHelper(DB_URL, DB_NAME, COLLECTION_NAME).then(collection=>{
		collection.findOne({studentID}).then((doc)=>{
			let _doc = doc.pdata.filter((el)=>{ return el.id===dayNom;})[0];
			ctx.reply(reply1(_doc, dayNom), Extra.HTML());
		});
	});
});

bot.command('help', (ctx) => ctx.reply('Try send a sticker!'));
bot.hears('hi', (ctx) => ctx.reply('Hey there!'));
bot.hears(/(buy)-(\d+)/i, (ctx) => {
	console.log(ctx.match);
	ctx.reply(ctx.match[2]);
});
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.startPolling();
