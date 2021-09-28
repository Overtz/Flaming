const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'hug',
            description: 'Use para abraçar algum usuário.',
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'Usuário a ser abraçado.',
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
            'https://i.pinimg.com/originals/5e/ae/a3/5eaea34371bc69c139eaccbbd7a5705a.gif',
            'https://i.pinimg.com/originals/16/f4/ef/16f4ef8659534c88264670265e2a1626.gif',
            'https://i.pinimg.com/originals/3c/45/81/3c4581db2b8d5143e17edddd3e2ea38a.gif',
            'https://i.pinimg.com/originals/6c/26/cc/6c26cc8164712b7f54980070199b8e7f.gif',
            'https://i.pinimg.com/originals/56/c7/3f/56c73f380d3ad747ff0600eb7ea1bbc7.gif',
            'https://i.pinimg.com/originals/96/9f/0f/969f0f462e4b7350da543f0231ba94cb.gif',
            'https://i.pinimg.com/originals/da/90/b8/da90b86dbf6a49a413b85444be417f4a.gif',
            'https://i.pinimg.com/originals/27/c9/1d/27c91d52982bae331db35d56e985427c.gif',
            'https://i.pinimg.com/originals/4a/cb/59/4acb591cae376b96d2e4e1276e49095c.gif',
            'https://i.pinimg.com/originals/7e/30/68/7e30687977c5db417e8424979c0dfa99.gif',
            'https://i.pinimg.com/originals/6d/b5/4c/6db54c4d6dad5f1f2863d878cfb2d8df.gif'
          ];
        
        var rand = list[Math.floor(Math.random() * list.length)];
        const user = interaction.options.getMember('usuário')
        
        const userItsAuthor = 'Você não pode abraçar á si mesmo.'
        const userError = 'Usuário mencionado não encontrado.'
        const sucess = 'abraçou'
        const embed = new MessageEmbed().setTitle('🫂 ・ Hug').setColor('#FF0000').setDescription(`${interaction.member} ${sucess} ${user}`).setImage(rand).setTimestamp()
        
        if (!user) {
            interaction.reply({ content: userError, ephemeral: true })
        } else if (user.id == interaction.member.id) {
            interaction.reply({ content: userItsAuthor, ephemeral: true })
        } else {
            await interaction.reply({ embeds: [embed] })
        }
    }
}