const {
    MessageType,
    WAMessageProto,
    DEFAULT_ORIGIN,
    getAudioDuration,
    MessageTypeProto,
    MediaPathMap,
    Mimetype,
    MimetypeMap,
    compressImage,
    generateMessageID,
    randomBytes,
    getMediaKeys,
    aesEncrypWithIV,
    hmacSign,
    sha256,
    encryptedStream
} = require('@adiwajshing/baileys')

exports.WAConnection = _WAConnection => { // Thanks to Nurutomo for WAConnection simplified
    class WAConnection extends _WAConnection {
        constructor(...args) {
            super(...args)
            if (!Array.isArray(this._events['CB:action,add:relay,message'])) this._events['CB:action,add:relay,message'] = [this._events['CB:action,add:relay,message']]
            else this._events['CB:action,add:relay,message'] = [this._events['CB:action,add:relay,message'].pop()]
            this._events['CB:action,add:relay,message'].unshift(async function (json) {
              try {
                let m = json[2][0][2]
                if (m.message && m.message.protocolMessage && m.message.protocolMessage.type == 0) {
                  let key = m.message.protocolMessage.key
                  let c = this.chats.get(key.remoteJid)
                  let a = c.messages.dict[`${key.id}|${key.fromMe ? 1 : 0}`]
                  let participant = key.fromMe ? this.user.jid : a.participant ? a.participant : key.remoteJid
                  let WAMSG = WAMessageProto.WebMessageInfo
                  this.emit('message-delete', { key, participant, message: WAMSG.fromObject(WAMSG.toObject(a)) })
                }
              } catch (e) { }
            })
            this.on(`CB:action,,battery`, json => {
              this.battery = Object.fromEntries(Object.entries(json[2][0][1]).map(v => [v[0], eval(v[1])]))
            })
        }
    }
    return WAConnection
}

exports.chatUpdate = async(conn, m) => {
    if (!m) return m
    if (m.message) {
        m.type = Object.keys(m.message)[0]
        m.smessage = m.message[m.type]
        if (m.type === 'ephemeralMessage') {
            exports.chatUpdate(conn, m.smessage)
            m.type = m.smessage.type
            m.smessage = m.smessage.smessage
        }
        let quoted = m.quoted = m.smessage.contextInfo ? m.smessage.contextInfo.quotedMessage : null
        if (m.quoted) {
            let qtype = Object.keys(m.quoted)[0]
            m.quoted = m.quoted[qtype]
        }
        m.text = m.smessage.text || m.smessage.caption || m.smessage || ''
        m.chat = m.key.remoteJid
        m.sender = m.key.fromMe ? conn.user.jid : m.participant ? m.participant : m.key.participant ? m.key.participent : m.chat
        m.mentionedJid = m.smessage.contextInfo ? m.smessage.contextInfo.mentionedJid : []
        m.isGroup = m.chat.endsWith('@g.us')
    }
    return m
}