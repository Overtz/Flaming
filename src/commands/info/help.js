const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            description: '📋 | Veja comandos utilizando /'
        })
    }

    run = (interaction) => {

        if (!interaction.guild.id == '791491164729638913') return;

      const role = '848999651926999080'

        if (interaction.member.roles.cache.has(role)) return;

        const embed = new MessageEmbed()
        .setTitle('📚 ・ Menu de Comandos')
        .setColor('#FF0000')
        .setDescription('Aqui você poderá ver todos os meus comandos!')
        .addField('Comandos de Moderação:', '`unmute`, `unban`,  `ban`,  `mute`,  `addrole`, `removerole`, `clear`, `kick`.')
        .addField('Comandos de Miscelânea:', '`avatar`, `bite`, `coinflip`, `hug`, `shoot`, `say`, `kiss`.')
        .addField('Comandos de Informação:', '`help`, `userinfo`, `ping`.')
        .addField('Comandos Utilitários:', '`sugestao`.')
        .setTimestamp()

        interaction.reply({
            embeds: [embed],
            content: `*Recomendado: Escreva / em sua barra de texto e veja meus comandos.*`,
            ephemeral: true
        })
    }
}