const { MessageButton } = require('discord.js')

module.exports = [
    {
        button: new MessageButton().setCustomId(`captcha`).setEmoji('✔️').setStyle('PRIMARY')
    }
]
