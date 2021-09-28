const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            description: 'Use para ver o avatar de algum usuário.',
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'Usuário do avatar.',
                    required: false
                }
            ]
        })
    }

    run = async (interaction) => {

        if (!interaction.guild.id == '791491164729638913') return;

              const role = '848999651926999080'

        if (interaction.member.roles.cache.has(role)) return;

        const user = interaction.options.getMember('usuário') || interaction.member
        
        const avatar = user.user.displayAvatarURL({ dynamic: true, size: 512 });
        const title = 'Avatar de';
          
        const embed = new MessageEmbed().setColor(`#FF0000`).setTitle(`${title} ${user.user.username}`).setImage(avatar).setTimestamp()
        await interaction.reply({ embeds: [embed] })
    }
}