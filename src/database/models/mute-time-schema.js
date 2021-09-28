const { Schema, model } = require('mongoose')

const muteTimeSchema = new Schema({
    userID: { type: String, require: true, unique: true },
    serverID: { type: String, require: true, unique: false },
    reason: { type: String, require: false, unique: false },
    authorID: { type: String, require: false, unique: true },
    time: { type: String, require: true }
})

module.exports = model('mute-time', muteTimeSchema)