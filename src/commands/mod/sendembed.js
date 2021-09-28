const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'sendembed',
            description: 'Faz com que o bot envie uma embed.',
            options: [
                {
                    name: 'canal',
                    type: 'CHANNEL',
                    description: 'Canal da mensagem que será enviada.',
                    required: true
                },
                {
                    name: 'titulo',
                    type: 'STRING',
                    description: 'Titulo da mensagem que será enviada.',
                    required: true
                },
                {
                    name: 'mensagem',
                    type: 'STRING',
                    description: 'Mensagem que será enviada.',
                    required: true
                },
                {
                    name: 'cor',
                    type: 'STRING',
                    description: 'Cor da embed que será enviada.',
                    required: false
                },
                {
                    name: 'reacao',
                    type: 'BOOLEAN',
                    description: 'Se haverá reação na mensagem.',
                    required: false
                }
            ]
        })
    }

    run = async (interaction) => {

        if (!interaction.guild.id == '791491164729638913') return;

        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ content: 'Você não tem permissão para usar este comando!', ephemeral: true })

            const canal = interaction.options.getChannel('canal')
            const titulo = interaction.options.getString('titulo')
            const texto = interaction.options.getString('mensagem')
            let cor = interaction.options.getString('cor')
            const reacao = interaction.options.getBoolean('reacao')

            if (!cor) {
                cor = 'RANDOM'
            }

            const mensagemFinal = new MessageEmbed()
            .setTitle(`${titulo}`)
            .setColor(cor)
            .setDescription(`${texto}`)
            .setFooter(`Quem enviou esta mensagem: ${interaction.member.user.username}`)

            interaction.reply({ content: 'Mensagem enviada com sucesso!', ephemeral: true })    
            .catch(() => interaction.editReply({ content: `ERRO | Erro ao tentar enviar a mensagem no canal.`, components: [] }))

            const enviar = await canal.send({ embeds: [mensagemFinal] })

            if (reacao === true) {
                enviar.react('👍')
            } else if (reacao === false) {} else {};
    }
}