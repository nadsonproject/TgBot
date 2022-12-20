const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');
const { telegram_bot_token, yandex_token, ChatId } = require('./token.js')
const { makeid, getRandomInt } = require('./generate')
const { button_object, button_object2 } = require('./buttons')

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(telegram_bot_token, { polling: true });

bot.setMyCommands([{ command: '/functions', description: 'functions' }])

const chat = () => {
    bot.on('message', async (msg) => {
        console.log(msg)
        const chatId = msg.chat.id;
        const TextMessage = msg.text
        const UserName = msg.chat.username

        for (let i = 0; i < ChatId.length; i++) {
            if (ChatId[i] != chatId) {
                await bot.sendMessage(ChatId[i], `${UserName} : ${TextMessage}`);
            }
            else {
                continue
            }
        }

        if (TextMessage == '/functions') {
            for (let i = 0; i < ChatId.length; i++) {
                if (ChatId[i] == chatId) {
                    await bot.sendMessage(ChatId[i], `this sends buttons`, button_object);
                }
                else {
                    continue
                }
            }
        }
    });


    bot.on('callback_query', async (data) => {
        if (data.data == 'sticker') {
            let stickers_num = getRandomInt(74);
            for (let i = 0; i < ChatId.length; i++) {
                await bot.sendSticker(ChatId[i], `https://tlgrm.ru/_/stickers/e65/38d/e6538d88-ed55-39d9-a67f-ad97feea9c01/192/${stickers_num}.webp`, button_object)
            }
        }

        if (data.data == 'audio') {
            let voice_num = getRandomInt(7);
            for (let i = 0; i < ChatId.length; i++) {
                await bot.sendVoice(ChatId[i], `./voice/${voice_num}.mp3`, button_object)
            }
        }

        if (data.data == 'gif') {
            let voice_num = makeid(4);
            for (let i = 0; i < ChatId.length; i++) {
                await bot.sendAnimation(ChatId[i], `https://i.gifer.com/${voice_num}.gif`, button_object)
            }
        }

        if (data.data == 'location') {
            data.data = 'nothing'
            console.log(data.data)
            await get_location()
        }
    })
}


const get_location = async () => {
    for (let i = 0; i < ChatId.length; i++) {
        bot.sendMessage(ChatId[i], 'please enter the coordinates : 55.755864 37.617698');

        bot.on('message', async (msg) => {
            async function get_coord(text) {
                var arr = text.split(' ')
                bot.sendLocation(ChatId[i], Number(arr[0]), Number(arr[1]))
                bot.off('message')
                bot.off('callback_query')
                await chat()
           }
           get_coord(msg.text)
        })
    }
}

chat()