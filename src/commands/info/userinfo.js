const Command = require('../../structures/Command')

const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'userinfo',
            description: 'Mostra informações de um usuário.',
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'Usuário para ver as informações.',
                    required: false
                }
            ]
        })
    }

    run = (interaction) => {

      if (!interaction.guild.id == '791491164729638913') return;

      const role = '848999651926999080'

        if (interaction.member.roles.cache.has(role)) return;

        const member = interaction.options.getMember('usuário') || interaction.member

        const avatar = member.user.displayAvatarURL({ dynamic: true });
        const userCreated = member.user.createdAt
        const id = member.user.id
        const username = member.user.username
        const tag = `#${member.user.discriminator}`
        const memberTag = member.user.tag

        const memberBot = member.user.bot

        const flags = member.user.flags || member.user.fetchFlags();

        const hasFlag = flags.toArray().includes("HYPESQUAD_BALANCE");
        const hasFlag1 = flags.toArray().includes("HOUSE_BRILLIANCE");
        const hasFlag2 = flags.toArray().includes("HOUSE_BRAVERY");
      
      const inline = true

      const bot = memberBot ? '`🤖` Sim' : '`🙂` Não'
      var emoji = '<:BalanceLogo:865872310632185877>'

      if(hasFlag) {
      } else if(hasFlag1) {
      emoji = '<:BraveryLogo:865872309930688513>'
      } else if (hasFlag2) {
      emoji = '<:BrillianceLogo:865872318629675018>'
      } else if (bot == '`🤖` Sim') {
      emoji = '`🤖`'
      }

        const myID = '**ID**'
        const myName = 'Nome:'
        const nick = member.nickname ? `Nickname: ${member.nickname}` : 'Nenhum apelido.'
        const accountDate = 'Entrou no Discord em:'
        const roles = 'Cargos:'
        const cargos = member.roles.cache.filter(r => r.id !== interaction.guildId).map(roles => `\`${roles.name}\``).join(' **|** ') || 'Nenhum cargo'
        let permissoes = member.permissions
        let perm;

        const permissions = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('permissions')
            .setEmoji('▶️')
            .setStyle('PRIMARY'),
        );
        const page1 = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('page1')
            .setEmoji('◀️')
            .setStyle('PRIMARY'),
        );

      if (permissoes.toArray().includes('ADMINISTRATOR')) {
        perm = 'Administrador.'
      } else {
        perm = permissoes.toArray().join(' **|** ')
      }
        

      const embed = new MessageEmbed()
        .setColor(`#FF0000`)
        .setThumbnail(avatar)
        .setTitle(`${emoji} ・ ${memberTag}`)
        .addField(`${myName}`, `${username}`, inline)
        .addField(`${myID}`, `${id}`, inline)
        .addField('**Tag**', tag, inline)
        .addField('**Apelido**', nick, inline)
        .addField('**Bot**', bot, inline)
        .addField(accountDate, formatDate('DD/MM/YYYY, às HH:mm:ss', userCreated))
        .addField('Entrou no Servidor em:', formatDate('DD/MM/YYYY, às HH:mm:ss', member.joinedAt))
        .setTimestamp()

        const embed2 = new MessageEmbed()
        .setColor(`#FF0000`)
        .setThumbnail(avatar)
        .setTitle(`${emoji} ・ ${memberTag}`)
        .addField(roles, `${cargos}`, inline)
        .addField('Permissões:', `${perm}`, inline)
        .setTimestamp()

        const filter = (i) => {
          return ['page1', 'permissions'].includes(i.customId) && i.user.id === interaction.member.id;
        }

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 25000 });
        
        collector.on('collect', async i => {
          if (i.customId === 'permissions') {
            await i.update({ embeds: [embed2], components: [page1] });
          }
          if (i.customId === 'page1') {
            await i.update({ embeds: [embed], components: [permissions] });
          }
        });
        
        collector.on('end', collected => collected);

        interaction.reply({ content: `<@${interaction.member.id}>`, embeds: [embed], components: [permissions] })

        function formatDate (template, date) {
          var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
          date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
          return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
            return template.split(specs[i]).join(item)
          }, template)
        }
    }
}