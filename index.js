const TelegramBot = require('node-telegram-bot-api');
//const ymap = require('ymaps');
const fetch = require('node-fetch');
//import fetch from 'node-fetch'
const { telegram_bot_token, yandex_token } = require('./token.js')

// replace the value below with the Telegram token you receive from @BotFather
//const telegram_bot_token = '5452918890:AAFz6l5Ky9xGwXzjHJmMg8FlnNJwFYDynXc';

//const yandex_token = '5c24c72b-fa58-4845-a2dc-0e959422017f'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(telegram_bot_token, { polling: true });

let ChatId = [448960021, 1508126065]; 


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


bot.setMyCommands([{ command: '/functions', description: 'functions' }])

const button_object = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'sticker', callback_data: 'sticker' }, { text: 'gif', callback_data: 'gif' }],
            [{ text: 'audio', callback_data: 'audio' }, { text: 'location', callback_data: 'location' }]
        ]
    })
}


const button_object2 = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'back', callback_data: 'back' }]
        ]
    })
}

//let Terebonk_stickers = `https://tlgrm.ru/_/stickers/e65/38d/e6538d88-ed55-39d9-a67f-ad97feea9c01/192/.webp`


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
            console.log(typeof (data.data))
            let stickers_num = getRandomInt(74);
            for (let i = 0; i < ChatId.length; i++) {
                await bot.sendSticker(ChatId[i], `https://tlgrm.ru/_/stickers/e65/38d/e6538d88-ed55-39d9-a67f-ad97feea9c01/192/${stickers_num}.webp`, button_object)
            }
        }

        if (data.data == 'audio') {
            console.log(data.data)
            let voice_num = getRandomInt(7);
            for (let i = 0; i < ChatId.length; i++) {
                await bot.sendVoice(ChatId[i], `./voice/${voice_num}.mp3`, button_object)
            }
        }

        if (data.data == 'gif') {
            console.log(data.data)
            let voice_num = makeid(4);
            for (let i = 0; i < ChatId.length; i++) {
                await bot.sendAnimation(ChatId[i], `https://i.gifer.com/${voice_num}.gif`, button_object)
            }
        }

        if (data.data == 'location') {
            console.log(data.data)
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
            //fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${yandex_token}&format=json&geocode=����������+6`)
            //   .then(data => data.json())
            //   .then(data2 => console.log(data2.response.GeoObjectCollection))
            async function get_coord(text) {
                var arr = text.split(' ')
                console.log(arr)
                //var lan = Number(arr[0])
                //var lat = Number(arr[1])
                //console.log(lan, lat)
                bot.sendLocation(ChatId[i], Number(arr[0]), Number(arr[1]))
                // await bot.close().then(chat())
                bot.off('message')
                bot.off('callback_query')
                await chat()
           }
           get_coord(msg.text)
        })
    }
}

chat()


//bot.sendLocation()

//bot.sendAnimation

//bot.sendAudio

//bot.sendVideo

//bot.sendVoice(ChatId[i], 'hello')


//for (let i = 0; i < ChatId.length; i++) {
//    let stickers_num
//    if (ChatId[i] != chatId) {
//        stickers_num = getRandomInt(74)
//        bot.sendSticker(ChatId[i], `https://tlgrm.ru/_/stickers/e65/38d/e6538d88-ed55-39d9-a67f-ad97feea9c01/192/${stickers_num}.webp`)
//    }
//    else
//        console.log('nothing')
//}







//bot.on('message', (msg) => {
//    console.log(msg)
//    const chatId = msg.chat.id;
//    const TextMessage = msg.text
//    const UserName = msg.chat.username
//    //if (ChatId.indexOf(chatId) == -1) { ChatId.push(chatId) }
//    //console.log(ChatId)
//    // send a message to the chat acknowledging receipt of their message
//    for (let i = 0; i < ChatId.length; i++) {
//        if (ChatId[i] != chatId)
//            bot.sendMessage(ChatId[i], `${UserName} : ${TextMessage}`);
//        else
//            continue
//        //ChatId[i] == chatId
//        //    ? continue 
//        //    : bot.sendMessage(ChatId[i], `${UserName} : ${TextMessage}`);
//}
//});

//const express = require('express');
//const app = express();
//const http = require('http');
//const server = http.createServer(app);
//const { Server } = require("socket.io");
//const io = new Server(server)



//app.get('/', (req, res) => {
//    res.sendFile(__dirname + "/index.html");
//});

//io.on('connection', (socket) => {
//    //socket.on('news', (data) => console.log(data))
//    socket.on('news', (data) => console.log(data))
//    socket.on('Hello', (data) => console.log(data))
//    console.log('This is socket')
//});

//server.listen(3000, () => {
//    console.log(`listening on 3000`);
//});
