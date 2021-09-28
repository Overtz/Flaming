const { MessageEmbed, MessageActionRow } = require('discord.js')
const captchaCategories = require('../../../util/captchaCategories')

module.exports = async (client, interaction) => {
    const channel = interaction.options.getChannel('canal')
    const configSchema = require('../../../database/models/config-schema')
    const configData = await configSchema.findOne({ serverID: interaction.guild.id })

    if (channel.type !== 'GUILD_TEXT') return interaction.reply({ content: 'Informe um canal de texto!', ephemeral: true })

    if (channel.type == 'GUILD_TEXT') {
        if (!configData) {
            await configSchema.create({
                serverID: interaction.guild.id,
                captchaChannel: channel.id
            })
        }
        if (configData) {
            await configSchema.findOneAndUpdate({ serverID: interaction.guild.id }, {
                captchaChannel: channel.id
            })
        }
    }

    const embedToSend = new MessageEmbed()
    .setColor(interaction.guild.me.displayHexColor)
    .setTitle("🤖 Captcha")
    .addField("Este é o nosso sistema de verificação.", "Para confirmar que você não é um robô basta reagir.")

    const button = captchaCategories.map(c => c.button)
    const row = new MessageActionRow().addComponents(button)

    channel.send({ embeds: [embedToSend], components: [row] })

    interaction.reply({ content: 'Canal setado com sucesso!', ephemeral: true })
}