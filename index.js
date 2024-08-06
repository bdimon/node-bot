const TelegramApi = require('node-telegram-bot-api');


const token = '7418996330:AAEh9obY8SuxK5hiAugP3oEwNfa6-zz6nKc';
const bot = new TelegramApi(token, {polling: true});
const webAppUrl = 'https://nodebot-pied.vercel.app/';

bot.setMyCommands([
    {command: '/start', description: 'Start of my bot'},
    {command: '/info', description: 'Get info about user'},
    {command: '/help', description: 'User can call to me by phone'},

])

const start = () => {
    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://sl.combot.org/prog1/webp/5xf09f988e.webp');
            await bot.sendMessage(chatId, 'Please fill form to the bottom', {
                // reply_markup: {
                //     keyboard: [
                //       [{text: 'Fill form'}, {text: 'Welcome'}, {text: 'Exit'},]
                //     ]
                // }
                reply_markup: {
                    inline_keyboard: [
                      [{text: 'Fill form', web_app: {url: webAppUrl + '/form'}},]
                    ]
                }
            })
            // await bot.sendMessage(chatId, 'Welcome to Bot Store of Anna hand made!')
            // Для того, чтобы завершить задачу
            return bot.sendMessage(chatId, 'Welcome to Bot Store of Anna hand made!')

        }
        if (text === '/info') {
            // await bot.sendMessage(chatId, `Hello ${msg.from.first_name} ${msg.from.last_name}`)
            // Для того, чтобы завершить задачу
            return bot.sendMessage(chatId, `Hello ${msg.from.first_name}!`)
        }
        if (text === '/help') {
            // await bot.sendMessage(chatId, `Hello ${msg.from.first_name} ${msg.from.last_name}`)
            // Для того, чтобы завершить задачу
            return bot.sendMessage(chatId, `${msg.from.first_name}, you can call me for emergency help`)
        }
        return bot.sendMessage(chatId, 'I don\'t understand you, sorry...');
    })
}
start();