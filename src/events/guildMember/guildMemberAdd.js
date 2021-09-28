const Event = require('../../structures/Event')

const configSchema = require('../../database/models/config-schema')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Event {
  constructor(client) {
      super(client, {
          name: 'guildMemberAdd'
      })
  }

  run = async (member) => {
    const bot = member.user.bot ? '`🤖` Sim' : ' `🙂` Não'
    const gifs = ["https://media1.tenor.com/images/8f95bef44e394ad4c76b2319b8142311/tenor.gif", "https://media1.tenor.com/images/b61f2258a1f1c6f675b7d85445443336/tenor.gif"]
    const configData = await configSchema.findOne({ serverID: member.guild.id })

    if (!configData) return;
    if (member.guild.id !== '791491164729638913') return;
    
    var rand = gifs[Math.floor(Math.random() * gifs.length)];
    
    const kickReason = "Anti-Bot"
    
    const moment = require('moment');
    
    const daysSinceCreation = moment().diff(moment(member.user.createdAt), 'days')

    if (configData) {
      if (configData.antiAlt == true) {
        if (daysSinceCreation < 10) {
          member.send({ content: 'Olá! você foi expulsado automaticamente por não conter os requisitos necessários para ingressar no servidor.\n*Contas com menos de 10 dias no discord não podem entrar em nosso servidor.*' })
          member.kick('Autokick: Conta com menos de 10 dias.').catch(error => console.log(error))
         }
      }

      if (configData.antiBot == true) {
        console.log(configData.antiBot)
        if(bot == '`🤖` Sim') {
          if (member.guild.id !== '791491164729638913') return;
          member.kick(kickReason).catch(error => console.log(error))
    
          const embedKick = new MessageEmbed()
          .setTitle('Anti-Bot')
          .setColor('#FF0000')
          .setThumbnail(member.user.displayAvatarURL())
          .setDescription(`
          Nome: ${member.user.tag}
          ID: ${member.id}`)
          .setTimestamp()
    
          member.guild.members.cache.get("434353523065487360").send({ embeds: [embedKick] }).catch((err) => {
            if (err.code == 50007) {
              return;
            } else {
              console.log('Erro', err)
            }
          })
          
        }
      }
    } else {
      const guild = "791491164729638913"
      if (member.guild.id !== guild) return;

      const channel = guild.channels.cache.get("791491164762013739");

        const embedWelcome = new MessageEmbed()
        .setColor("#FF0000")
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle(`<a:nervoso:799202298362200096> Boas-vindas <a:nervoso:799202298362200096>`)
        .setDescription(`Seja bem-vindo ao servidor Flaming Eyes <@${member.id}>, leia as regras e se divirta com nosso servidor! Graças a você estamos com ${member.guild.memberCount}.
        
        Caso queira saber sobre as últimas novidades do Servidor, acompanhe nosso categoria de Anúncios, caso queira convidar alguém, utilize o comando "g!convite" ou vá para o canal "💠・convite". Estamos com vagas na Staff, caso queira se candidatar vá para a categoria "Staff".`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
        .setTimestamp()
        .setFooter('Bot by GardZock')


         member.roles.add("882536211065999380")
         member.send({ embeds: [embedWelcome] })
         
          const embed = new MessageEmbed()
          .setColor("#FF0000")
          .setAuthor(member.user.tag, member.user.displayAvatarURL())
          .setTitle(`<a:nervoso:799202298362200096> Boas-vindas <a:nervoso:799202298362200096>`)
          .setImage(rand)
          .setDescription(`Seja Bem-Vindo, **${member.user}**, ao **${guild.name}**! Atualmente estamos com **${member.guild.memberCount}** membros.`)
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
          .setFooter("Leia as regras e se divirta!")
          .setTimestamp();
    
        channel.send({ embeds: [embed] });

        const contador = member.guild.memberCount
      
        channel.setTopic(`Estamos com exatamente: **${contador} membros.**`).catch(console.error);
    }
      }
}