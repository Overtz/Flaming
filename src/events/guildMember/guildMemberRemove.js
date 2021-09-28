const Event = require('../../structures/Event')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildMemberRemove'
        })
    }

    run = async (member) => {
        
          const guild = "791491164729638913"
          const channel = member.guild.channels.cache.get("791491164762013739");
          let emoji = '<a:pensive1:799202591438405662>'
          if (guild != member.guild.id) {
            return console.log("Sem saída pra você!");
           } else {
              let embed = await new MessageEmbed()
              .setColor("#FF0000")
              .setAuthor(member.user.username, member.user.displayAvatarURL())
              .setTitle(`${emoji} Saída ${emoji}`)
              .setImage("https://i.pinimg.com/originals/64/14/f3/6414f38852190fc5e11e1fd3c151e9b3.gif")
              .setDescription(`Adeus **${member.user}**, espero que volte! Atualmente estamos com **${member.guild.memberCount}** membros. `)
              .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
              .setFooter('ID do usuário: ' + member.user.id)
              .setTimestamp();
        
            channel.send({ embeds: [embed] });

            const contador = member.guild.memberCount
      
            channel.setTopic(`Estamos com exatamente: **${contador} membros.**`).catch(console.error);
        }
    }
}