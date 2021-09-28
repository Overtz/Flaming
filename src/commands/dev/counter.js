const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'counter',
            description: 'Staff Command.'
        })
    }

    run = async (interaction) => {

        if (!interaction.member.permissions.has('ADMINISNTRATOR')) return;

        const channel = this.client.channels.cache.get('791491164762013739')

        const contador = interaction.guild.memberCount
      
        await channel.setTopic(`Estamos com exatamente: **${contador} membros.**`).catch(console.error);
        interaction.reply({ content: 'Contador atualizado com sucesso!' })
    }
}