const { default: axios } = require('axios');
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const bot = new Telegraf('5563948963:AAGt8gL7GcH2kp_DElLXat6DpQLm5jcxh_o');
bot.start((ctx) => ctx.reply('Привет! Я бот, который может рассказать про погоду по местоположению. Для этого тебе нужно отправить свою геопозицию.'));
bot.command('admins', ctx => {

    ctx.reply('Разработала Локтионова Анна - @ANL0K')

 })
bot.on('message', async (ctx)=>{
    if(ctx.message.location){
        console.log(ctx.message.location);
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&lang=ru&appid=4e16a89c84601853e9c2c5663508f85c&units=metric`;
        const response = await axios.get(url);
        console.log(response);
        ctx.reply(`${response.data.name}: ${response.data.main.temp} C°`);
    }
})
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));