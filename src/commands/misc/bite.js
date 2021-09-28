const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'bite',
            description: 'Use para morder algum usuário.',
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'Usuário a ser mordido.',
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
            'https://media1.tenor.com/images/8099a2d3e3f820ddcf96072fc33ad332/tenor.gif',
            'https://thumbs.gfycat.com/ConsiderateFrighteningAzurevasesponge-size_restricted.gif',
            'https://media1.tenor.com/images/06f88667b86a701b1613bbf5fb9205e9/tenor.gif',
            'https://media1.tenor.com/images/f308e2fe3f1b3a41754727f8629e5b56/tenor.gif',
            'https://pa1.narvii.com/6848/877299fa76fa8cda220a3fcb8f8699e6288971c4_hq.gif'
          ];
        
        var rand = list[Math.floor(Math.random() * list.length)];
        const user = interaction.options.getMember('usuário')
        
        const userItsAuthor = 'Você não pode morder á si mesmo.'
        const userError = 'Usuário mencionado não encontrado.'
        const biteSucess = 'mordeu'
        const embed = new MessageEmbed().setTitle('😲 ・ Bite').setColor('#FF0000').setDescription(`${interaction.member} ${biteSucess} ${user}`).setImage(rand).setTimestamp()
        
        if (!user) {
            interaction.reply({ content: userError, ephemeral: true })
        } else if (user.id == interaction.member.id) {
            interaction.reply({ content: userItsAuthor, ephemeral: true })
        } else {
            await interaction.reply({ embeds: [embed] })
        }
    }
}