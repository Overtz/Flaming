const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }
    run = async (interaction) => {
        if (interaction.isCommand()) {
            if (!interaction.guild) return;
            const cmd = this.client.commands.find(c => c.name === interaction.commandName)
            if (cmd) {

                cmd.run(interaction)
            }
        } else if (interaction.isButton()) {
            if (interaction.customId.startsWith('captcha')) {

                if (interaction.member.roles.cache.has('882536116799017022')) return interaction.reply({ content: 'Você já foi verificado!' })

                interaction.reply({ content: 'Você foi verificado com sucesso!', ephemeral: true })
                interaction.member.roles.add('882536116799017022').catch((error) => {
                    if (error.code == 10011) { //anti-erro
                    } else {
                        console.error
                    }
                }) // 882536116799017022
                interaction.member.roles.add('791491164729638922').catch((error) => {
                    if (error.code == 10011) { //anti-erro
                    } else {
                        console.error
                    }
                })
                interaction.member.roles.remove('882536211065999380').catch((error) => {
                    if (error.code == 10011) {
                    } else {
                        console.error
                    }
                }) // 882536211065999380
            }
        }
    }
} 