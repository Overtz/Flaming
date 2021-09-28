const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'falar',
            description: 'Faz com que o bot diga alguma mensagem.',
            options: [
                {
                    name: 'mensagem',
                    type: 'STRING',
                    description: 'A mensagem que será enviada no canal.',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {

        if (!interaction.guild.id == '791491164729638913') return;

      const role = '848999651926999080'

        if (interaction.member.roles.cache.has(role)) return;

        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: 'Você não tem permissão para usar este comando!', ephemeral: true })

            const texto = interaction.options.getString('mensagem')

            const mensagemFinal = `${texto}\n\n*Mensagem enviada por: <@${interaction.member.id}>*`

            interaction.reply({ content: 'Mensagem enviada com sucesso!', ephemeral: true })    
            .catch(() => interaction.editReply({ content: `ERRO | Erro ao tentar enviar a mensagem no canal.`, components: [] }))

            await interaction.channel.send({ content: mensagemFinal })
    }
}