const Command = require('../../structures/Command')

const configSchema = require('../../database/models/config-schema')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'configuracoes',
            description: 'Staff Command.'
        })
    }
    
    run = async (interaction) => {

        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ content: 'Você não tem permissão para executar este comando!', ephemeral: true })

        if (!interaction.guild.me.permissions.has('ADMNISNTRATOR')) return interaction.reply({ content: 'Eu não tenho permissão para executar este comando!', ephemeral: true })

        const embedToSend = new MessageEmbed()
        .setTitle('⚙️ | Configuração do Servidor')
        .setColor(interaction.guild.me.displayHexColor)
        .setDescription(`
        Seja bem-vindo a página de configuração do servidor, oque deseja ver?`)
        .addField('Opções:', '📡 - Canais')
        .setTimestamp()

        const msg = await interaction.reply({ embeds: [embedToSend], fetchReply: true })

        await msg.react('📡')

        const filter = (reaction, user) => {
            return ['📡'].includes(reaction.emoji.name) && user.id === interaction.member.id
        }

        const collector = msg.createReactionCollector({ filter, time: 60000 })
        collector.on('collect', async (reaction, user) => {
            const configData = await configSchema.findOne({ serverID: interaction.guild.id })

            if (reaction.emoji.name === '📡') {
                
                const embed = new MessageEmbed()
                .setTitle('📡 | Canais')
                .setColor(interaction.guild.me.displayHexColor)
                .addField('🛡️ Captcha', `<#${configData.captchaChannel}> *${configData.captchaChannel}*`)
                .addField('🎉 Entrada', `<#${configData.welcomeChannel}> *${configData.welcomeChannel}*`)
                .addField('🗄️ Logs', `<#${configData.logsChannel}> *Não alteravél por comando até o momento*`)
                .addField('🗃️ Log-punições', `<#${configData.punitionLogsChannel}> *Não alteravél por comando até o momento*`)
                .setFooter('Use /config para alterar as configurações.')

                msg.edit({ content: `<@${interaction.member.id}>`, embeds: [embed] })
                msg.reactions.removeAll()
            }
        })
    }
}