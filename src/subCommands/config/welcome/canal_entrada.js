const { MessageEmbed } = require('discord.js')

module.exports = (client, interaction) => {
    const channel = interaction.options.getChannel('canal')
    const configSchema = require('../../../database/models/config-schema')
    const configData = await configSchema.findOne({ serverID: interaction.guild.id })

    if (channel.type !== 'GUILD_TEXT') return interaction.reply({ content: 'Informe um canal de texto!', ephemeral: true })

    if (!configData) {
        await configSchema.create({
            serverID: interaction.guild.id,
            welcomeChannel: channel.id
        })
    } else {
        await configSchema.findOneAndUpdate({
            serverID: interaction.guild.id
        }, {
            welcomeChannel: channel.id
        })
    }
    
    interaction.reply({ content: 'Canal setado com sucesso!', ephemeral: true })
}