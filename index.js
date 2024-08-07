const TelegramApi = require('node-telegram-bot-api');
// import '.env';

const token = process.env.TOKEN_API;
const webAppUrl = process.env.WEB_APP_URL;

const bot = new TelegramApi(token, {polling: true});


// bot.setMyCommands([
//     {command: '/start', description: 'Start of my bot'},
//     {command: '/info', description: 'Get info about user'},
//     {command: '/help', description: 'User can call to me by phone'},

// ])

const start = () => {
    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            // await bot.sendSticker(chatId, 'https://sl.combot.org/prog1/webp/5xf09f988e.webp');

            await bot.sendMessage(chatId, 'Please fill form on the bottom', {
                reply_markup: {
                    keyboard: [
                      [{text: 'Please fill form', web_app: {url: webAppUrl + '/form'}}],
                      [{text: 'Please Go!', web_app: {url: webAppUrl}}]
                    ]
                }
            });

            await bot.sendMessage(chatId, 'Welcome to our shop!', {
                reply_markup: {
                    inline_keyboard: [
                      [{text: 'Welcome to our shop!', web_app: {url: webAppUrl}}]
                    ]
                }
            });

            // await bot.sendMessage(chatId, 'Welcome to Bot Store of Anna hand made!')
            // Для того, чтобы завершить задачу
            // return bot.sendMessage(chatId, 'Welcome to Bot Store of Anna hand made!')
        }

        // if (text === '/info') {
        //     // await bot.sendMessage(chatId, `Hello ${msg.from.first_name} ${msg.from.last_name}`)
        //     // Для того, чтобы завершить задачу
        //     return bot.sendMessage(chatId, `Hello ${msg.from.first_name}!`)
        // }
        // if (text === '/help') {
        //     // await bot.sendMessage(chatId, `Hello ${msg.from.first_name} ${msg.from.last_name}`)
        //     // Для того, чтобы завершить задачу
        //     return bot.sendMessage(chatId, `${msg.from.first_name}, you can call me for emergency help`)
        // }

        if (msg?.web_app_data?.data) {
          try {
              const data = JSON.parse(msg?.web_app_data?.data);

              await bot.sendMessage(chatId, 'Thank you for feedback!');
              await bot.sendMessage(chatId, 'Your country is: ' + data?.country);
              await bot.sendMessage(chatId, 'Your street is: ' + data?.street);

              setTimeout(async () => {
                await bot.sendMessage(chatId, 'All data will be available ONLY in this chat!');
              }, 3000)

          } catch (e) {
              console.log(e);
          }

      }
        // return bot.sendMessage(chatId, 'I don\'t understand you, sorry...');
    });
}

start();