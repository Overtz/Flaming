const Command = require('../../structures/Command')

const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'unban',
            description: 'Desbane um usuário do servidor.',
            options: [
                {
                    name: 'id',
                    type: 'STRING',
                    description: 'Usuário a ser banido.',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {

        if (!interaction.guild.id == '791491164729638913') return;

        const role = '848999651926999080'

        if (interaction.member.roles.cache.has(role)) return;

        if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ content: 'Você não tem permissão para usar este comando!', ephemeral: true })

        const id = interaction.options.getString('id')

        if (!interaction.guild.me.permissions.has('BAN_MEMBERS')) return interaction.reply({ content: 'Eu não tenho permissão para desbanir membros.', ephemeral: true })

        interaction.guild.members.unban(id)
            .then(() => interaction.reply({ content: `ID \`${id}\` desbanida com sucesso!` }))
            .catch(() => interaction.reply({ content: 'Erro ao desbanir o usuário!', ephemeral: true }))
    }
}