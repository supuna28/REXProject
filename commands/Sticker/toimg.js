const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const { MessageType } = require('@adiwajshing/baileys')
const { exec } = require('child_process')
const i18n = require('i18n')
module.exports = {
    name: "toimg",
    tags: "sticker", 
    description: i18n.__('toimg.description'),
    group: false,
    admin: false, 
    botAdmin: false, 
    owner: false, 
    async run(m, { conn, args, text }) {
        let isMedia = (m.type === 'imageMessage' || m.type === 'videoMessage' || m.quoted)
        if (!isMedia) throw i18n.__("failed.notQuoted")
        let q = m.quoted ? m.quoted : m
        let media = await q.download('./tmp/img')
        let output = './tmp/toimg.png'
        conn.reply(m.chat, i18n.__("toimg.process"), m)
        try {
            exec(`ffmpeg -i ${media} ${output}`, (err) => {
                fs.unlinkSync(media)
                if (err) throw i18n.__('failed.error')
                conn.sendMessage(m.chat, fs.readFileSync(output), MessageType.image, { quoted: m, caption: i18n.__('toimg.done') })
                fs.unlinkSync(output)
            })
        } catch (e) {
            return conn.reply(m.chat, i18n.__('failed.error'), m)
        }
    }
}
