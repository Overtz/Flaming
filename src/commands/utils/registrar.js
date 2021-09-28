const Command = require('../../structures/Command')

const { MessageActionRow, MessageButton } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'registrar',
            description: 'Registre um usuário utilizando este comando!',
            options: [
                {
                    name: 'usuário',
                    description: 'Usuário a ser registrado.',
                    type: 'USER',
                    required: true
                }
            ]
        })
    }

    run = (interaction) => {

        if (!interaction.guild.id == '791491164729638913') return;

        const member = interaction.options.getMember('usuário')

        if (!interaction.member.permissions.has('MANAGE_ROLES')) return interaction.reply({ content: 'Você precisa de permissão para executar este comando.', ephemeral: true })

        if (interaction.user.bot ? 'Sim':'Nao' === 'Sim') return interaction.reply({ content: 'Você não pode registrar um bot.', ephemeral: true });

        const role = interaction.guild.roles.cache.get('848999561783279616')

        if (member.roles.cache.has(role.id)) return interaction.reply({ content: 'Este Usuário já se registrou!', ephemeral: true });

        const roleHomem = interaction.guild.roles.cache.get('791491164729638919')
        const roleMulher = interaction.guild.roles.cache.get('791491164729638918')
        const roleHetero = interaction.guild.roles.cache.get('791491164729638917')
        const roleLGBT = interaction.guild.roles.cache.get('791491164729638916')
        const roleMenor = interaction.guild.roles.cache.get('791491164729638915')
        const roleMaior = interaction.guild.roles.cache.get('791491164729638914')

        const homem = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('homem')
					.setLabel('Homem')
					.setStyle('PRIMARY'),
			)
        const mulher = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('mulher')
					.setLabel('Mulher')
					.setStyle('PRIMARY'),
			)
        const hetero = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('hetero')
					.setLabel('Hetero')
					.setStyle('PRIMARY'),
			)
        const lgbt = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('lgbt')
					.setLabel('LGBT')
					.setStyle('PRIMARY'),
			)
            const menor = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('menor')
					.setLabel('-18')
					.setStyle('PRIMARY'),
			)
            const maior = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('maior')
					.setLabel('+18')
					.setStyle('PRIMARY'),
			)

            let message = 'Escolha o cargo para ser adicionado no Usuário.'

        const filter = (i) => {
            return ['homem', 'mulher', 'maior', 'menor', 'lgbt', 'hetero'].includes(i.customId) && i.user.id === interaction.member.id
        }
    
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
       
                collector.on('collect', async (i) => {
                    if (i.customId === 'mulher') {
                        await member.roles.add(roleMulher)

                        await i.update({ content: message, components: [hetero, lgbt], ephemeral: true })
                    }
                    if (i.customId === 'homem') {
                        await member.roles.add(roleHomem)

                        await i.update({ content: message, components: [hetero, lgbt], ephemeral: true })
                    }
                    if (i.customId === 'lgbt') {
                        await member.roles.add(roleLGBT)


                        await i.update({ content: message, components: [menor, maior], ephemeral: true })
                    }
                    if (i.customId === 'hetero') {
                        await member.roles.add(roleHetero)

                        await i.update({ content: message, components: [menor, maior], ephemeral: true })
                    }
                    if (i.customId === 'menor') {
                        await member.roles.add(roleMenor)

                        message = 'Registro completo!'

                        await i.update({ content: message, components: [], ephemeral: true })
                        await member.roles.add(role)
                    }
                    if (i.customId === 'maior') {
                        await member.roles.add(roleMaior)

                        message = 'Registro completo!'

                        await i.update({ content: message, components: [], ephemeral: true })
                        await member.roles.add(role)
                    }
                })

                collector.on('end', (collected, reason) => {
                    if(reason == 'time') {
                      message = 'Seu tempo acabou!'

                        interaction.editReply({ content: message, ephemeral: true })
                    }
                })

        interaction.reply({
            content: message,
            components: [homem, mulher],
            ephemeral: true
        })
    }
}