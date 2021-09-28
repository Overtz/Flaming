const Client = require('./src/structures/Client')

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

client.login(process.env.TOKEN)