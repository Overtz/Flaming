const { Schema, model } = require('mongoose')

const configSchema = new Schema({

    serverID: { type: String, default: '836291214847901796' },

    captchaChannel: { type: String, default: "887014539105800272" },
    welcomeChannel: { type: String, default: "791491164762013739" },
    logsChannel: { type: String, default: "829415725109084252" },
    punitionLogsChannel: { type: String, default: "791491165425238024" },

    antiBot: { type: Boolean, default: false },
    antiAlt: { type: Boolean, default: false },
    antiSpam: { type: Boolean, default: false },

    desactivedSpamChannels: { type: Array, default: ['791491165161390091', '791491165161390092', '791491165161390093', '802781148601778219', '802782946217426954', '802790219689623592'] }
})

module.exports = model('server-config', configSchema)