const configSchema = require('../../../database/models/config-schema')

module.exports = async (client, interaction) => {

    const ativadoOuDesativado = interaction.options.getBoolean('ativado_ou_desativado')
    const configData = await configSchema.findOne({ serverID: interaction.guild.id })
    
    if (!configData) {
        let config = await configSchema.create({
            serverID: interaction.guild.id,
            antiBot: ativadoOuDesativado
        })
        config.save()
    }
    if (configData) {
        let config = await configSchema.findOneAndUpdate({ serverID: interaction.guild.id }, {
            antiBot: ativadoOuDesativado
        })
        config.save()
    }

    interaction.reply({ content: `Modo alterado para: ${ativadoOuDesativado}, com sucesso!`, ephemeral: true })
}