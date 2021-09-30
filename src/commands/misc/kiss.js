const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'kiss',
            description: 'Use para beijar algum usuário.',
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'Usuário a ser beijado.',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {

        if (!interaction.guild.id == '791491164729638913') return;

      const role = '848999651926999080'

        if (interaction.member.roles.cache.has(role)) return;

        const nekoApi = require('nekos.life');
        const neko = new nekoApi();
        const image = (await neko.sfw.kiss()).url;

        const user = interaction.options.getMember('usuário')
        const userItsAuthor = 'Você não pode beijar á si mesmo.'
        const userError = 'Usuário mencionado não encontrado.'
        const embed = new MessageEmbed().setTitle(`💋 ・ Kiss`).setColor('#FF0000').setDescription(`${interaction.member} beijou ${user}`).setImage(image).setTimestamp()
        
        if (!user) {
            interaction.reply({ content: userError, ephemeral: true })
        } else if (user.id == interaction.member.id) {
            interaction.reply({ content: userItsAuthor, ephemeral: true })
        } else {
            await interaction.reply({ embeds: [embed] })
        }
    }
}