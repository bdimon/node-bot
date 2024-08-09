const TelegramApi = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = process.env.TOKEN_API;
const webAppUrl = process.env.WEB_APP_URL;
const port = process.env.PORT;
const bot = new TelegramApi(token, {polling: true});

const app = express();

app.use(express.json());
app.use(cors());

const start = () => {
    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {

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

        }

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
    });
}

app.post('/web-data', async(req, res) => {
    const{queryId, products, totalPrice} = req.body;
    try{
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            queryId,
            title: 'Successful purchase',
            input_message_content: {message_text: `Congratulations on your successful purchase for $ ${totalPrice}, ${products.map(item => item.title).join(', ')}`}
        })
        return res.status(200).json({})
    }catch (e){
        console.log(e);
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            queryId,
            title: 'Failed to purchase the product',
            input_message_content: {message_text: 'Failed to purchase the product'}
        })
        return res.status(500).json({})
    }
})


app.listen(port, () => console.log('Server started sucsessfully')
);

start();