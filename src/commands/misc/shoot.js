const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'shoot',
            description: 'Use para artirar em algum usuário.',
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'Usuário a levar tiros.',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {

        if (!interaction.guild.id == '791491164729638913') return;
        
      const role = '848999651926999080'

        if (interaction.member.roles.cache.has(role)) return;

        var list = [
            'https://media1.tenor.com/images/e9c914be61acb8f2033f2327605c5562/tenor.gif',
            'https://media1.tenor.com/images/a0caaaec7f3f48fbcf037dd9e6a89c51/tenor.gif',
            'https://i0.wp.com/i.pinimg.com/originals/63/c0/c6/63c0c6b632dfffd790b60a87007f1bfd.gif',
            'https://i.pinimg.com/originals/1e/17/c4/1e17c4368b75652535b90b98bd3b6c0c.gif',
            'https://i.gifer.com/g1V4.gif'
          ];
        
        var rand = list[Math.floor(Math.random() * list.length)];
        const user = interaction.options.getMember('usuário')
        
        const userItsAuthor = 'Você não pode atirar em si mesmo.'
        const userError = 'Usuário mencionado não encontrado.'
        const biteSucess = 'atirou em'
        const embed = new MessageEmbed().setTitle('<:piupiu:866256391537819680> ・ Shoot').setColor('#FF0000').setDescription(`${interaction.member} ${biteSucess} ${user}`).setImage(rand).setTimestamp()
        
        if (!user) {
            interaction.reply({ content: userError, ephemeral: true })
        } else if (user.id == interaction.member.id) {
            interaction.reply({ content: userItsAuthor, ephemeral: true })
        } else {
            await interaction.reply({ embeds: [embed] })
        }
    }
}