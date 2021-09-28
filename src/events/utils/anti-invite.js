const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'messageCreate'
        })
    }

    run = async (message) => {
        if (!message) return;
        if (message.channel.type == "dm") return;
        if (message.author.bot) return;
        if (!message.guild) return;
        if (!message.guild.id == '791491164729638913') return;

        const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;
  
    if (regex.exec(message.content)) {
      await message.delete();
      const msg = await message.channel.send({
          content: `${message.author} **você não pode enviar links aqui!**`
    })
    setTimeout(() => {
        msg.delete()
    }, 5000)
    }
}
}