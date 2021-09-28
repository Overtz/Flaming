const configSchema = require('../../../database/models/config-schema')

module.exports = async (client, interaction) => {

    const ativadoOuDesativado = interaction.options.getBoolean('ativado_ou_desativado')
    const channel = interaction.options.getChannel('canal')
    const configData = await configSchema.findOne({ serverID: interaction.guild.id })
    
    if (!configData) {
        if (ativadoOuDesativado == true) {
            return interaction.reply({ content: 'Este canal não estava desativado.' });
        } else {
            configSchema.create({
                serverID: interaction.guild.id
            })
            await interaction.reply({ content: 'Criando dados do Servidor na DataBase...', ephemeral: true })

            setTimeout(async () => {
                const config = await configSchema.findOne({ serverID: interaction.guild.id })
                const array = config.desactivedSpamChannels

                if (array.includes(channel.id)) {
                    interaction.editReply({ content: 'Este canal já está como padrão desativado.', ephemeral: true })
                } else {
                await configSchema.findOneAndUpdate({ serverID: interaction.guild.id }, {
                    desactivedSpamChannels: array.push(channel.id)
                })
                interaction.editReply({ content: `Modo alterado para: ${ativadoOuDesativado}, com sucesso!`, ephemeral: true })
            }
            }, 3000)
        }
        
    }
    if (configData) {
        const { desactivedSpamChannels } = configData;
        const array = configData.desactivedSpamChannels

        if (ativadoOuDesativado == false) {
        if (desactivedSpamChannels.includes(channel.id)) {
            interaction.reply({ content: 'Este canal já está com o Anti-Spam ativado.'})
        } else {
            await configSchema.findOneAndUpdate({ serverID: interaction.guild.id }, {
                desactivedSpamChannels: array.push(channel.id)
            })
            interaction.reply({ content: `Modo alterado para: ${ativadoOuDesativado}, com sucesso!`, ephemeral: true })
        }
    } else {
        if (desactivedSpamChannels.includes(channel.id)) {
            await configSchema.findOneAndUpdate({ serverID: interaction.guild.id }, {
                desactivedSpamChannels: array.splice(channel.id, 1)
            })
            interaction.reply({ content: `Modo alterado para: ${ativadoOuDesativado}, com sucesso!`, ephemeral: true })
        } else {
            interaction.reply({ content: 'Este canal já está com o Anti-Spam desativado.' })
        }
    }
        
    }

    
}