const { Instagram } = require('../../lib/scrape')
const { MessageType } = require('@adiwajshing/baileys')
const fetch = require('node-fetch')

module.exports = {
    name: ["ig", "igdl"], 
    group: false,
    admin: false, 
    botAdmin: false, 
    owner: false, 
    async run(m, { conn, args, text }) {
        if (!text) throw global.msgFail[global.language].urlNotIncluded
        let data = await Instagram.downloader(text)
        conn.reply(m.chat, global.msgBot[global.language].wait, m)
        let vbuff = await fetch(data.video_link, {headers: { 'User-Agent': 'okhttp/4.5.0'}, method: 'GET' })
        let buff = await vbuff.buffer()
        let str = `
Title : ${data.title}
URL : ${data.url}
Description : ${data.description}
Total like : ${data.total_like}
Total comments : ${data.total_comment}
Total viewers : ${data.view_count}
Total diputar : ${data.play_count}
        `.trim()
        conn.sendMessage(m.chat, buff, MessageType.video, { quoted: m, caption: str })
    }
}