const Command = require('../../structures/Command')

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'emmiter',
      description: 'Staff Command.'
    })
  }

  run = async (interaction) => {
      if (interaction.member.permissions.has('MANAGE_GUILD')) {
        if (interaction.member.id == '434353523065487360') {
          this.client.emit('guildMemberAdd', interaction.member);
          interaction.reply({ content: 'Evento realizado com sucesso!', ephemeral: true })
        } else {
          return;
        }
      }
  }
}