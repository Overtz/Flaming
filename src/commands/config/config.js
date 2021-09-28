const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'config',
            description: '⚙️ | Configurar dados do servidor no bot.',
            requireDatabase: true,
            options: [
                {
                    type: 'SUB_COMMAND_GROUP',
                    name: 'welcome',
                    description: 'Configuração do sistema de boas-vindas.',
                    options: [
                        {
                            type: 'SUB_COMMAND',
                            name: 'canal_entrada',
                            description: 'Configurar o canal onde a mensagem de boas-vindas será enviada.',
                            options: [
                                {
                                    type: 'CHANNEL',
                                    name: 'canal',
                                    description: 'Canal de texto onde a mensagem será enviada.',
                                    required: true
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'SUB_COMMAND_GROUP',
                    name: 'captcha',
                    description: 'Configuração do sistema de captcha.',
                    options: [
                        {
                            type: 'SUB_COMMAND',
                            name: 'mensagem',
                            description: 'Mensagem onde será o captcha.',
                            options: [
                                {
                                    type: 'CHANNEL',
                                    name: 'canal',
                                    description: 'Canal de texto onde a mensagem será enviada.',
                                    required: true
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'SUB_COMMAND_GROUP',
                    name: 'antialt',
                    description: 'Configuração do sistema de Anti-Alt.',
                    options: [
                        {
                            type: 'SUB_COMMAND',
                            name: 'modo',
                            description: 'Ativar ou desativar.',
                            options: [
                                {
                                    type: 'BOOLEAN',
                                    name: 'ativado_ou_desativado',
                                    description: '"True" para ativar e "False" para desativar.',
                                    required: true
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'SUB_COMMAND_GROUP',
                    name: 'antibot',
                    description: 'Configuração do sistema de Anti-Bot.',
                    options: [
                        {
                            type: 'SUB_COMMAND',
                            name: 'modo',
                            description: 'Ativar ou desativar.',
                            options: [
                                {
                                    type: 'BOOLEAN',
                                    name: 'ativado_ou_desativado',
                                    description: '"True" para ativar e "False" para desativar.',
                                    required: true
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'SUB_COMMAND_GROUP',
                    name: 'antispam',
                    description: 'Configuração do sistema de Anti-Bot.',
                    options: [
                        {
                            type: 'SUB_COMMAND',
                            name: 'modo',
                            description: 'Ativar ou desativar.',
                            options: [
                                {
                                    type: 'BOOLEAN',
                                    name: 'ativado_ou_desativado',
                                    description: '"True" para ativar e "False" para desativar.',
                                    required: true
                                }
                            ]
                        },
                        {
                            type: 'SUB_COMMAND',
                            name: 'desativar_canais',
                            description: 'Desativar ou Ativar o Anti-Spam em um canal.',
                            options: [
                                {
                                    type: 'CHANNEL',
                                    name: 'canal',
                                    description: 'Canal que deseja desativar.',
                                    required: true
                                },
                                {
                                    type: 'BOOLEAN',
                                    name: 'ativado_ou_desativado',
                                    description: '"True" para ativar e "False" para desativar.',
                                    required: true
                                 }
                            ]
                        }
                    ]
                }
            ]
        })
    }

    run = (interaction) => {
        if (!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply({ content: 'Você não tem permissão para utilizar este comando!', ephemeral: true })

        const subCommandGroup = interaction.options.getSubcommandGroup()
        const subCommand = interaction.options.getSubcommand()

        require(`../../subCommands/config/${subCommandGroup}/${subCommand}`)(this.client, interaction)
    }
}