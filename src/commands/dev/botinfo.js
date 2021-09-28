const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            description: 'Staff Command.'
        })
    }

    run = async (interaction) => {
        if (!interaction.guild.id == '791491164729638913') return;
        if (!interaction.member.permissions.has('ADMNINSTRATOR')) return;

        const discloud = require('discloud-status');
        const os = require('os');
        const ms = require('ms')

        const ram = discloud.ram();

        const embedToSend = new MessageEmbed()
        .setTitle('Minhas informações')
        .setThumbnail(this.client.user.displayAvatarURL())
        .setColor('#ff0000')
        .addField('Meu Processador:', `\`\`${os.cpus()[0].model}\`\``)
        .addField('Plataforma', `\`\`${os.platform()}\`\``)
        .addField('Tempo Online', `\`\`${ms(Math.floor(os.uptime()), { long: true })}.\`\``)
        .addField('Ram:', `\`\`${ram}\`\``)
        .addField('Meu ping:', `\`\`${this.client.ws.ping}ms\`\``)

        interaction.reply({ embeds: [embedToSend] })
    }
}