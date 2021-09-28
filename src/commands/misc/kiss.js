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

        var list = [
            'https://imgur.com/iclUiUN.gif',
            'https://imgur.com/lYQt9rx.gif',
            'https://imgur.com/w1TU5mR.gif',
            'https://media2.giphy.com/media/G3va31oEEnIkM/giphy.gif',
            'https://i.pinimg.com/originals/29/65/3a/29653ad6e372605c4c43c3c015f9e499.gif',
            'http://3.bp.blogspot.com/-N5d6Gw2cDsI/UsIRQLfyyvI/AAAAAAAABwg/E_kae0NTlVQ/s1600/tumblr_mx5ltt9x9y1so28a4o1_500.gif'
          ];
        
        var rand = list[Math.floor(Math.random() * list.length)];
        const user = interaction.options.getMember('usuário')
        
        const userItsAuthor = 'Você não pode beijar á si mesmo.'
        const userError = 'Usuário mencionado não encontrado.'
        const sucess = 'beijou'
        const embed = new MessageEmbed().setTitle('<a:love:878900969805598811> ・ Kiss').setColor('#FF0000').setDescription(`${interaction.member} ${sucess} ${user}`).setImage(rand).setTimestamp()
        
        if (!user) {
            interaction.reply({ content: userError, ephemeral: true })
        } else if (user.id == interaction.member.id) {
            interaction.reply({ content: userItsAuthor, ephemeral: true })
        } else {
            await interaction.reply({ embeds: [embed] })
        }
    }
}