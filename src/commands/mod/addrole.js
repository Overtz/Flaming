const Command = require('../../structures/Command')

const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'addrole',
            description: 'Adiciona um cargo a um Usuário determinado.',
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'Usuário a receber o cargo.',
                    required: true
                },
                {
                    name: 'cargo',
                    type: 'ROLE',
                    description: 'Cargo a ser adicionado.',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {

        if (!interaction.guild.id == '791491164729638913') return;
      
        const roleVerifi = '848999651926999080'

        if (interaction.member.roles.cache.has(roleVerifi)) return;

        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: 'Você não tem permissão para usar este comando!', ephemeral: true })

        const user = interaction.options.getMember('usuário')
        const role = interaction.options.getRole('cargo')

        const userNotMentioned = 'Usuário mencionado não foi encontrado.'
        const roleError = 'Cargo mencionado não foi encontrado.'
        const roleUserError = 'Usuário mencionado já se encontra com este cargo.'
        const cargoSucess = `O Cargo ${role} foi adicionado com sucesso, em: ${user}.`
        const cargoSucessDM = `Um cargo com o nome: ${role.name}, foi adicionado em você em: ${interaction.guild.name}.\nQuem adicionou em você: ${interaction.member}.`

        const lowPermissionAuthor = 'Sua permissão é mais baixa doque a deste cargo.'
        const lowPermissionClient = 'Minha permissão é mais baixa doque a deste cargo.'


        if (!user) {
            interaction.reply({ content: userNotMentioned, ephemeral: true })
        }
        
        if(!role) {
            interaction.reply({ content: roleError, ephemeral: true })
        };

        if(user.roles.cache.has(role.id)) {
            interaction.reply({ content: roleUserError, ephemeral: true })
        } else {

            if (interaction.member.roles.highest.position < role.position) return interaction.reply({ content: lowPermissionAuthor, ephemeral: true })
    
            if (interaction.guild.me.roles.highest.position < role.position) return interaction.reply({ content: lowPermissionClient, ephemeral: true })

            const embed = new MessageEmbed().setTitle(`💼 ・ Adição de Cargos`).setColor('#FF0000').setDescription(cargoSucessDM).setTimestamp()

            user.roles.add(role, 'AddRole').then(
                user.send({ embeds: [embed] })).catch(error => console.log(`Algo deu errado em AddRole: ${error}`));
                await interaction.reply({ content: cargoSucess })
            }
    }
}