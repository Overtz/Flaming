const Command = require('../../structures/Command')

const { MessageEmbed     } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            description: 'Desilencia um usuário do servidor.',
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'Usuário a ser desilenciado.',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {

        if (!interaction.guild.id == '791491164729638913') return;

        const role = '848999651926999080'

        if (interaction.member.roles.cache.has(role)) return;

        const { guild } = interaction;

        const userError = 'Usuário mencionado não foi encontrado!'
        const userNotMutedError = 'Usuário mencionado não se encontra mutado.';
        const userSucessUnmute = `**Usuário desilenciado com sucesso!**`;
        const userSucessUnmute1 = `\n**Usuário:**`;
        const userSucessUnmute2 = `\n**Autor:**`;
        const roleError = 'Usuário mencionado não se encontra mutado.';
        const lowPermissionClient = 'Minha permissão é mais baixa doque a deste Usuário.'
        const clientPermissionError = 'Minha permissão é mais baixa doque a deste Usuário.'

        if (!interaction.member.permissions.has('MUTE_MEMBERS')) return interaction.reply({ content: 'Você não tem permissão para usar este comando!', ephemeral: true });

        const user = interaction.options.getMember('usuário')
      
        if (!user) return interaction.reply({ content: userError, ephemeral: true })
    
        const roleId = '791491164729638921'

          if (!roleId) return interaction.reply({ content: roleError, ephemeral: true })
    
          const roleSearch = guild.roles.cache.get(roleId)
          
          if (!roleSearch) return interaction.reply({ content: roleError, ephemeral: true })
          
          const memberHasRole = user.roles.cache.has(roleId)
    
          if (!memberHasRole) return interaction.reply({ content: userNotMutedError, ephemeral: true })
    
          if(!guild.me.permissions.has('MANAGE_ROLES')) { 
              interaction.reply({ content: clientPermissionError, ephemeral: true })
            if (!guild.me.permissions.has('ADMINISTRATOR')) {
                interaction.reply({ content: clientPermissionError, ephemeral: true })
            }
        } else {
          if (guild.me.roles.highest.position < roleSearch.position) return interaction.reply({ content: lowPermissionClient, ephemeral: true })
    
          const embed = new MessageEmbed().setTitle(`🔇 ・ Unmute`).setColor('#FF0000').setDescription(`${userSucessUnmute}${userSucessUnmute1} <@${user.id}>${userSucessUnmute2}${interaction.member}`).setTimestamp()
          
          const canal = interaction.guild.channels.cache.get('791491165425238024')

          await user.roles.remove(roleId, ['Unmute'])
          interaction.reply({ content: userSucessUnmute, ephemeral: true })
          canal.send({ embeds: [embed] })
        }
    }
}