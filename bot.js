const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const bot = new Telegraf('X');
const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');
moment().format();
moment.locale('ru');
const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'tbot';
const COLLECTION_NAME = 'diaryinfo';
console.log('bot starts');
const replys = require('./replys/replys');

console.log(replys);
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



/*let MongoConnect = function (url) {
  MongoClient.connect(url)
}*/
bot.hears(/(start)-(\d+)-(\d+)/i, (ctx) => {
	let dayNom = parseInt(ctx.match[3]);
	let studentID = ctx.match[2];
	MongoHelper(DB_URL, DB_NAME, COLLECTION_NAME).then(collection=>{
		collection.findOne({studentID}).then((doc)=>{
			let _doc = doc.pdata.filter((el)=>{ return el.id===dayNom;})[0];
			ctx.reply(replys.replyAll(_doc), Extra.HTML());
		});
	});
});
bot.hears('темы', (ctx) => {
	let dayNom = parseInt(ctx.match[3]);
	let studentID = ctx.match[2];
	MongoHelper(DB_URL, DB_NAME, COLLECTION_NAME).then(collection=>{
		collection.findOne({studentID}).then((doc)=>{
			let _doc = doc.pdata.filter((el)=>{ return el.id===dayNom;})[0];
			ctx.reply(replys.replyTheme(_doc), Extra.HTML());
		});
	});
});
bot.hears('расписание', (ctx) => {
	let dayNom = parseInt(ctx.match[3]);
	let studentID = ctx.match[2];
	MongoHelper(DB_URL, DB_NAME, COLLECTION_NAME).then(collection=>{
		collection.findOne({studentID}).then((doc)=>{
			let _doc = doc.pdata.filter((el)=>{ return el.id===dayNom;})[0];
			ctx.reply(replys.replyShedule(_doc), Extra.HTML());
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
