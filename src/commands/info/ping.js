const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Mostra o ping do bot.'
        })
    }

    run = (interaction) => {

        if (!interaction.guild.id == '791491164729638913') return;

      const role = '848999651926999080'

        if (interaction.member.roles.cache.has(role)) return;

        interaction.reply({
            content: `O ping do bot é \`${this.client.ws.ping}\`ms.`,
            ephemeral: true
        })
    }
}