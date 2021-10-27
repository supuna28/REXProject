const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const { MessageType } = require('@adiwajshing/baileys')
const { exec } = require('child_process')
module.exports = {
    name: "toimg", 
    group: false,
    admin: false, 
    botAdmin: false, 
    owner: false, 
    async run(m, { conn, args, text }) {
        let isMedia = (m.type === 'imageMessage' || m.type === 'videoMessage' || m.quoted)
        if (!isMedia) throw global.msgFail[global.language].notQuoted
        let q = m.quoted ? m.quoted : m
        let media = await q.download('./tmp/img')
        let output = './tmp/toimg.png'
        conn.reply(m.chat, global.msgBot[global.language].converterWait, m)
        try {
            exec(`ffmpeg -i ${media} ${output}`, (err) => {
                fs.unlinkSync(media)
                if (err) throw global.msgFail[global.language].failed
                conn.sendMessage(m.chat, fs.readFileSync(output), MessageType.image, { quoted: m, caption: global.msgBot[global.language].done })
                fs.unlinkSync(output)
            })
        } catch (e) {
            return conn.reply(m.chat, global.msgFail[global.language].failed, m)
        }

    }
}
