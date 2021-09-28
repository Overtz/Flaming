const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'verificar',
            description: 'Verifique-se utilizando este comando!'
        })
    }

    run = (interaction) => {

        if (!interaction.guild.id == '791491164729638913') return;

        const random = [
            "345NM",
            "23KMF",
            "SADMA",
            "POUWE",
            "15MHA",
            "M4SN2"
        ]

        const role = interaction.guild.roles.cache.get('882536116799017022')

        if (interaction.member.roles.cache.has(role.id)) return interaction.reply({ content: 'Você já se verificou!', ephemeral: true });
       

        const rand = random[Math.floor(Math.random() * random.length)]

        const filter = ({ member }) => interaction.member == member
    
        const collector = interaction.channel.createMessageCollector({filter, max: 1, time: 25000});
       
                collector.on('collect', async (collected) => {

                    if (rand.toLowerCase() == collected.content.toLowerCase()) {
                        collected.delete()
                         interaction.editReply({ content: 'Verificado com sucesso!', ephemeral: true })
                         await interaction.member.roles.add(role)
                    }
                })

                collector.on('end', (collected, reason) => {
                    if(reason == 'time') {
                        interaction.editReply({ content: `Seu tempo acabou! Seu perfil do Discord foi enviado para um membro da nossa equipe, será análisado e caso seja visto com alguma coisa que quebre alguma regra, será removido do Servidor.`, ephemeral: true })
                        const canal = interaction.guild.channels.cache.get('882536592802197564')

                        const embed = new MessageEmbed()
                        .setThumbnail(interaction.member.user.displayAvatarURL({ dynamic: true }))
                        .setTitle('🚫 ・ Anti-FakeAccount')
                        .setColor('#FF0000')
                        .setDescription(`
                        Usuário: ${interaction.member.user.username}.
                        ID: ${interaction.member.id}.
                        Data de criação da conta: ${formatDate('DD/MM/YYYY, às HH:mm:ss', interaction.member.user.createdAt)}.
                        Entrou no Servidor em: ${formatDate('DD/MM/YYYY, às HH:mm:ss', interaction.member.joinedAt)}.`)
                        .setTimestamp()

                        canal.send({ embeds: [embed] })
                    }
                })

            function formatDate (template, date) {
                var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
                date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
                return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
                  return template.split(specs[i]).join(item)
                }, template)
              }

        interaction.reply({
            content: `Escreva o item correspondente á ${rand}.`,
            ephemeral: true
        })
    }
}