
const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            description: 'Faz com que o apague um número de 1 a 99 mensagens.',
            options: [
                {
                    name: 'quantidade',
                    type: 'STRING',
                    description: 'Quantidade de mensagens a serem apagadas.',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {

        if (!interaction.guild.id == '791491164729638913') return;

        const role = '848999651926999080'

        if (interaction.member.roles.cache.has(role)) return;


        const quantidade = interaction.options.getString('quantidade')

        if (!quantidade) return interaction.reply({ content: 'Adicione um número de 1 a 99 mensagens a serem apagadas.', ephemeral: true })

        const deleteCount = parseInt(quantidade, 10);
        const fetched = await interaction.channel.messages.fetch({
            limit: deleteCount + 1
          });

        const messageCountError = 'Adicione um número de 1 a 99 mensagens a serem apagadas.'
        const oldMessageError ='Alguma mensagem selecionada, tem a idade maior que 14 dias.'
        let clearSucess;

        if (quantidade > 1) {
            clearSucess = 'Mensagens apagadas nesse canal.'
        } else {
            clearSucess = 'Mensagem apagada nesse canal.'
        }

        const embed = new MessageEmbed().setColor('#FF0000').setAuthor('🧹 ・ Clear').setDescription(`**${quantidade} ${clearSucess}**`)

        if (!deleteCount || deleteCount < 1 || deleteCount > 99) {
            interaction.reply({ content: messageCountError, ephemeral: true })
        } else {
            const msg = await interaction.channel.bulkDelete(fetched).catch(error => {
                if (error.code == 50034) {
                    interaction.reply({ content: oldMessageError, ephemeral: true })
                } else {
                    console.log('Erro em Clear: ' + error.code)
                }
            });
            if (msg) {
                 interaction.reply({ embeds: [embed] })
                 setTimeout(() => {
                    if (interaction.deleteReply()) return console.log('Mensagem programada deletada com sucesso!');
                  }, 15000)
            }
        }
    }
}