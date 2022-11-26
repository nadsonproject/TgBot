
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

module.exports = {button_object, button_object2}