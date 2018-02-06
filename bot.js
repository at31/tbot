const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const bot = new Telegraf('521903905:AAHJf8mBwEEDZ-TcVq4PgIwuIN9Pupcy8i0')
const MongoClient = require('mongodb').MongoClient
const test = require('assert')
const mongodb = require('mongodb')
const moment = require('moment')
moment().format()
moment.locale('ru')
const url = 'mongodb://localhost:27017'
const dbName = 'tbot'

console.log('bot starts')
/*
bot.start((ctx) => {
  console.log('started:', ctx.from.id)
  return ctx.reply('Welcome!')
})
*/
// https://t.me/VCLI_BOT?start=buy-200300      :tada:
bot.hears(/(start)-(\d+)-(\d+)/i, (ctx) => {
  console.log(Extra);
  console.log(ctx.match);
	MongoClient.connect(url, function (err, client) {
    test.equal(null, err);
    console.log("Connected correctly to server");

    const db = client.db(dbName);
		db.collection('diaryinfo').findOne({"studentID": ctx.match[2]}, (err, fo)=>{
      test.equal(null, err);
      let _fo = fo.pdata.filter((el)=>{ return el.id===parseInt(ctx.match[3])})[0]
      let replyStr = `📅<b>${_fo.title}</b>\r\n`
      _fo.data.forEach((el)=>{
        let startDate = moment.unix(el.startDate/1000).format('HH:MM')
        let endDate = moment.unix(el.stopDate/1000).format('HH:MM')
        let theme = el.theme===null ? 'нет' : el.theme
        let homework = el.homework===null ? 'нет' : el.homework
        let irs =
        `${el.number}) <b>${el.subject.name}</b> ⏰ ${startDate}-${endDate}
        💡Тема: ${theme}
        📗Дом.работа:${homework}\n`
        replyStr = replyStr + irs
      })

			ctx.reply(replyStr, Extra.HTML());
		});
	});

})
bot.command('help', (ctx) => ctx.reply('Try send a sticker!'))
bot.hears('hi', (ctx) => ctx.reply('Hey there!'))
bot.hears(/(buy)-(\d+)/i, (ctx) => {
  console.log(ctx.match);
  ctx.reply(ctx.match[2]);
})
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.startPolling()
