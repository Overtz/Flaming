const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')
const ms = require("ms")

const muteTimeSchema = require('../../database/models/mute-time-schema')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            description: 'Silencia um usuário do servidor.',
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'Usuário a ser silenciado.',
                    required: true
                },
                {
                    name: 'motivo',
                    type: 'STRING',
                    description: 'Motivo que o usuário será silenciado.',
                    required: true
                },
                {
                    name: 'tempo',
                    type: 'STRING',
                    description: 'Tempo que o usuário será silenciado.',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {

        if (!interaction.guild.id == '791491164729638913') return;

        const role = '848999651926999080'

        if (interaction.member.roles.cache.has(role)) return;


        if (!interaction.member.permissions.has('MUTE_MEMBERS')) return interaction.reply({ content: 'Você não tem permissão para usar este comando!', ephemeral: true })

        const { guild } = interaction;
        
        const userError = 'Usuário mencionado não encontrado.'
        const userMutedError = 'Usuário mencionado já se encontra mutado.';
        const userSucessMute = `**Usuário mutado com sucesso!**`;
        const userSucessMute1 = `\n**Motivo:**`;
        const userSucessMute2 = `\n**Autor:**`;
        const userSucessMute3 = `\n**Tempo:**`
        const mutetimeError = 'Adicione um tempo válido para executar este comando!';
        const roleError = `Role para mutar não encontrada.`;
        const lowPermissionClient = 'Minha permissão é mais baixa doque a deste Usuário.'
        const dmMessage1 = 'Você foi silenciado em:'
        const dmMessage2 = 'por:'
        const reason = 'Nenhum.'
      
      const user = interaction.options.getMember('usuário')
      
      if (!user) return interaction.reply({ content: userError, ephemeral: true }).then((msg) => setTimeout(function(){msg.delete()}, 30000)).catch(error => console.log(error));

      const muteTimeData = await muteTimeSchema.findOne({ userID: user.id })
      
      const roleId = '791491164729638921'

      if (!roleId) return interaction.reply({ content: roleError, ephemeral: true })

      const roleSearch = guild.roles.cache.get(roleId)
      
      if (!roleSearch) return interaction.reply({ content: roleError, ephemeral: true })

      if (user.roles.cache.has(roleId)) return interaction.reply({ content: userMutedError, ephemeral: true })

      if (muteTimeData) return interaction.reply({ content: userMutedError, ephemeral: true });
      
      const mutetime = interaction.options.getString('tempo');
      if(!mutetime) return interaction.reply({ content: mutetimeError, ephemeral: true })

      const time = ms(mutetime)
      
      let muteReason = interaction.options.getString('motivo');
      if (!muteReason) {
        muteReason = reason
      }

      if(!guild.me.permissions.has('MANAGE_ROLES')) { 
          interaction.reply({ content: lowPermissionClient, ephemeral: true })
        if (!guild.me.permissions.has('ADMINISTRATOR')) {
            interaction.reply({ content: lowPermissionClient, ephemeral: true })
        }
    } else {
      if (guild.me.roles.highest.position < roleSearch.position) return interaction.reply({ content: lowPermissionClient, ephemeral: true });

      const embed = new MessageEmbed().setTitle(`🔇 ・ Mute`).setColor('#FF0000').setDescription(`${userSucessMute}${userSucessMute1} ${muteReason}${userSucessMute2}${interaction.member}${userSucessMute3} ${mutetime}`).setTimestamp()
      
      const canal = interaction.guild.channels.cache.get('791491165425238024')



      const addrole = await user.roles.add(roleSearch, ['Mute'])
      if (addrole) { 
        interaction.reply({ content: 'Usuário silenciado com sucesso!' }).then((i) => {
        setTimeout(() => {
          if (interaction.deleteReply()) return console.log('👍')
        }, 15000)
      })

      await canal.send({ embeds: [embed] })
      await user.send(`${dmMessage1} ${interaction.guild.name} ${dmMessage2} ${mutetime} | ${userSucessMute1} ${muteReason}`).catch((e) => {
        if (e.code == 50007) {
            console.log('Membro com privado fechado.')
        } else {
            console.log(e)
        }
      })

      if (!muteTimeData) {
          muteTimeSchema.create({
              userID: user.id,
              serverID: interaction.guild.id,
              reason: muteReason,
              authorID: interaction.member.id,
              time: time + Date.now()
          })
      }
    }
    }
      
    }
}