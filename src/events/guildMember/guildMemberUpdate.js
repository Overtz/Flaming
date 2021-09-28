const Event = require('../../structures/Event')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildMemberUpdate'
        })
    }

    run = async (oldMember, newMember) => {


      if (!oldMember.guild.id == '791491164729638913') return;

    const rolesSelecionadas = [
      "791491164746285074",
      "791491164762013737",
      "791491164746285075",
      "791491164762013736",
      "820510863483338759",
      "798771800011309076",
      "848970820372922450"
    ]
  
      const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
      const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));

      if (newMember.user.bot ? '`🤖` Sim' : '`🙂` Não' === '`🤖` Sim') return;
      if (oldMember.user.bot ? '`🤖` Sim' : '`🙂` Não' === '`🤖` Sim') return;

      const falseRemoved = await rolesSelecionadas.includes(`${removedRoles.map(r => r.id)}`)
      const falseAdded = await rolesSelecionadas.includes(`${addedRoles.map(r => r.id)}`)

    const canal = oldMember.guild.channels.cache.get('798773079970283530')

    const embed = new MessageEmbed()
    .setTitle('📟・LOG-STAFF')
    .setColor('RANDOM')
    .setThumbnail(oldMember.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
  
      if (removedRoles.size > 0) {
        if (falseRemoved == false) return;
        embed.addField('Cargos Removidos:', `O cargo <@&${removedRoles.map(r => r.id)}>, foi removido de: ${oldMember.displayName}.`);
        embed.setColor('#ff0000')
      }
  
      if (addedRoles.size > 0) {
        if (falseAdded == false) return;
        embed.addField('Cargos Adicionados:', `O cargo <@&${addedRoles.map(r => r.id)}>, foi adicionado em: ${oldMember.displayName}.`);
        embed.setColor('#00FF00')
      }

      canal.send({ embeds: [embed] })
    }
    
}