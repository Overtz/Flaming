const configSchema = require('../../../database/models/config-schema')

module.exports = async (client, interaction) => {

    const ativadoOuDesativado = interaction.options.getBoolean('ativado_ou_desativado')
    const configData = await configSchema.findOne({ serverID: interaction.guild.id })
    
    if (!configData) {
        await configSchema.create({
            serverID: interaction.guild.id,
            antiSpam: ativadoOuDesativado
        })
    }
    if (configData) {
        await configSchema.findOneAndUpdate({ serverID: interaction.guild.id }, {
            antiSpam: ativadoOuDesativado
        })
    }

    interaction.reply({ content: `Modo alterado para: ${ativadoOuDesativado}, com sucesso!`, ephemeral: true })
}