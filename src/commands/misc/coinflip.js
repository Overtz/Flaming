const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'coinflip',
            description: 'Jogue uma moeda e teste sua sorte.',
            options: [
                {
                    name: 'lado',
                    type: 'STRING',
                    description: 'Escolha cara ou coroa para jogar.',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {

        if (!interaction.guild.id == '791491164729638913') return;

        const role = '848999651926999080'

        if (interaction.member.roles.cache.has(role)) return;

        var array1 = ["cara", "coroa"];
        
        const caraOUcoroaError = 'Insira `cara` ou `coroa` para executar este comando!';
        const result = `O resultado foi`;
        const win = `**, você ganhou!**`;
        const lose = `**, você perdeu!**`;

        const caraOuCoroa = interaction.options.getString('lado')

        var rand = Math.floor(Math.random() * array1.length);

        const embedWin = new MessageEmbed().setColor('#FF0000').setTitle('🪙 ・ Cara ou coroa').setDescription(`${result} ${array1[rand]}${win}`).setTimestamp();
        const embedLose = new MessageEmbed().setColor('#FF0000').setTitle('🪙 ・ Cara ou coroa').setDescription(`${result} ${array1[rand]}${lose}`).setTimestamp();

        if (!caraOuCoroa|| (caraOuCoroa.toLowerCase() !== "cara" && caraOuCoroa.toLowerCase() !== "coroa")) {
            interaction.reply({ content: caraOUcoroaError, ephemeral: true })
        } else if (caraOuCoroa.toLowerCase() == array1[rand]) {
            interaction.reply({ embeds: [embedWin] })
        } else if (caraOuCoroa.toLowerCase() != array1[rand]) {
            interaction.reply({ embeds: [embedLose] })
        }
    }
}