const Event = require('../../structures/Event')

const configSchema = require('../../database/models/config-schema')

const usersMap = new Map();
const LIMIT = 5;
const TIME = 10000;
const DIFF = 2000;

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'messageCreate'
        })
    }

    run = async (message) => {

        if (!message) return;
        if (message.channel.type == "dm") return;
        if (message.author.bot) return;
        if (!message.guild) return;
        if (!message.guild.id == '791491164729638913') return;

        const configData = await configSchema.findOne({ serverID: message.guild.id })
        const muteTimeSchema = require('../../database/models/mute-time-schema')

        if (!configData) return;

        if (configData.antiSpam == true) {

            if (['791491165161390091', '791491165161390092', '791491165161390093', '791491165161390094', '802781148601778219', '802782946217426954', '802790219689623592'].includes(message.channel.id)) return;

            if (message.member.roles.cache.has('791491164729638921')) return;

        if (usersMap.has(message.member.id)) {
            const userData = usersMap.get(message.member.id);
            const { lastMessage, timer } = userData;
            const difference = message.createdTimestamp - lastMessage.createdTimestamp;
            var msgCount = userData.msgCount;
            if (difference > DIFF) {
                clearTimeout(timer)
                console.log('Timeout deletado.')
                userData.msgCount = 1;
                userData.message = message;
                userData.timer = setTimeout(() => {
                    usersMap.delete(message.member.id);
                    console.log('Usuário removido por reset.')
                }, TIME)
                usersMap.set(message.member.id, userData)
            }
            ++msgCount;

            if (parseInt(msgCount) === LIMIT) {
                const role = message.guild.roles.cache.get('791491164729638921')
                message.member.roles.add(role, ['Auto-Mod'])
                if (message.member.send({ content: 'Você foi silenciado pelo Anti-Spam.' })) {
                } else {
                    message.channel.send({ content: `<@${message.member.id}>, você foi silenciado pelo Anti-Spam.` })
                }
                muteTimeSchema.create({ userID: message.member.id, serverID: message.guild.id, time: 60000 + Date.now(), reason: 'Auto-Mod' })
                message.channel.bulkDelete(msgCount).catch(error => {
                    console.log('Erro em Clear: ' + error.code)
                });
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.member.id, userData)
            }
        } else {
            let fn = setTimeout(() => {
                usersMap.delete(message.member.id);
                console.log('Usuário removido do mapa.')
            }, TIME)
            
            usersMap.set(message.member.id, {
                msgCount: 1,
                lastMessage: message,
                timer: fn
            });
            
        }
    } else {
        return;
    }
    }
}