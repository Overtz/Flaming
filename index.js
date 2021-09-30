const Client = require('./src/structures/Client')

const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
})
app.listen(process.env.PORT);

const { MessageEmbed } = require('discord.js')

const client = new Client({
  intents: [
      'GUILDS',
      'GUILD_MESSAGE_REACTIONS',
      'GUILD_MESSAGES',
      'GUILD_INVITES',
      'GUILD_VOICE_STATES',
      'GUILD_MEMBERS',
      'GUILD_PRESENCES',
      'GUILD_EMOJIS_AND_STICKERS',
      'DIRECT_MESSAGE_REACTIONS',
      'DIRECT_MESSAGE_TYPING',
      'DIRECT_MESSAGES',
  ]
})

process.on('unhandledRejection', (reason, promise) => {
    var newError;
    try {
    newError = new MessageEmbed().setColor('RED').setTitle(`Report de Erro | unhandledRejection`).setDescription(`\`\`\`js\nPromise: ${promise} Reason: ${reason.stack}\`\`\``)
    } catch(err) {
      console.log('Erro', err)
    }
    client.channels.cache.get('892314829673594920').send({ embeds: [newError] }).catch(err => { })
});

client.login(process.env.TOKEN)