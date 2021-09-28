const Event = require('../../structures/Event')

const { MessageEmbed } = require('discord.js');
const configSchema = require('../../database/models/config-schema');

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async () => {

      const muteTimeSchema = require('../../database/models/mute-time-schema')
      const client = this.client

      setInterval(async () => {
    
        try {
    
            let guild = client.guilds.cache.get('791491164729638913')

            const muteTimeData = await muteTimeSchema.findOne({ serverID: guild.id })
            const configData = await configSchema.findOne({ serverID: guild.id })

            if (!muteTimeData) return;
            if (!configData) return;
    
            var member = await client.users.fetch(muteTimeData.userID).catch(e => {
              
              if (e) return;
              
            })
            
            var author = await client.users.fetch(muteTimeData.authorID).catch(e => {
              
                if (e) return;
                
              })

            var time = await muteTimeData.time
            if (time == 'Permanente.') return;
            var channel = guild.channels.cache.get(configData.punitionLogsChannel)
            var role = guild.roles.cache.find(r => r.name === "Mutado")

            const remover = time.replace("m", "")

            var filterFloat = function (value) {
              if(/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
                .test(value))
                return Number(value);
            return NaN;
          }

            const tempo = filterFloat(remover)
            
            if (Date.now() > tempo) {
              
              var moment = require("moment")
              moment.locale("pt-BR")
              
              if(guild.members.resolve(member)) {

                const resolveMember =  guild.members.resolve(member)
              
                resolveMember.roles.remove(role, `Unmute`)
                
              }

              var logs = new MessageEmbed()
              .setColor('#ff0000')
              .setAuthor('🚫 Log de punições 🚫')
              .setThumbnail(member.displayAvatarURL({ dynamic: true }))
              .addField('Usuário que havia sido punido:', `${member} | ${member.id}`, true)
              .addField('Tipo de Punição:', 'Mute', true)
              .setTimestamp()

              if (muteTimeData.reason) {
                logs.addField('Motivo da punição:', `${muteTimeData.reason}`, true)
              }
              if (muteTimeData.author) {
                logs.addField('Punido por:', `${author} | ${muteTimeData.authorID}`, true)
              }

              await muteTimeSchema.findOneAndDelete({ userID: member.id })
              
              if (!channel) return;
        
              channel.send({ embeds: [logs] })
              
            } else {
              
              if (guild.members.resolve(member)) {
                
                if (guild.members.resolve(member).roles.cache.has(role.id)) return;
                
                guild.members.resolve(member).roles.add(role.id)
                
              }
          }
        } catch (error) {
          console.log('erro ready.Mute.js', error)
        }
        
      }, 2000)
    }
}