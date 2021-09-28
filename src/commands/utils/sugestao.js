const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'sugestao',
            description: 'Envia uma sugestão.',
            options: [
                {
                    name: 'mensagem',
                    type: 'STRING',
                    description: 'Mensagem que será enviada.',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {

        if (!interaction.guild.id == '791491164729638913') return;

        const role = '848999651926999080'

        if (interaction.member.roles.cache.has(role)) return;

        const conten = interaction.options.getString('mensagem')
        
          const canal = interaction.guild.channels.cache.get("804072855033479188");

          const embed = new MessageEmbed()
          .setAuthor(interaction.member.user.username, interaction.member.user.displayAvatarURL())
            .setColor("#00a000")
            .addField("Sugestão:", `${conten}`)
            .setFooter(`ID do Autor: ${interaction.member.id}`)
            .setTimestamp()

          await interaction.reply({ content: `A mensagem foi enviada com sucesso!`, ephemeral: true });
          const msg = await canal.send({ embeds: [embed] })

          await msg.react("<a:sim:799202662180061214>")
          await msg.react("<a:nao:799202641203822632>")
    }
}