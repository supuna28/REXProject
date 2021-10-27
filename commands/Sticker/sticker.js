const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const { MessageType } = require('@adiwajshing/baileys')
const addExif = require('../../lib/exif')
const package = require('../../package.json')
module.exports = {
    name: "sticker", 
    group: false,
    admin: false, 
    botAdmin: false, 
    owner: false, 
    async run(m, { conn, args, text }) {
        // fill your code here
        let stiker = false
        let isMedia = (m.type === 'imageMessage' || m.type === 'videoMessage' || m.quoted)
        if (!isMedia) throw global.msgFail[global.language].notQuoted
        let q = m.quoted ? m.quoted : m
        let media = await q.download('./tmp/img')
        conn.reply(m.chat, global.msgBot[global.language].stickerWait, m)
        await ffmpeg(media)
        .input(media)
        .on('error', function (err) {
            console.log("Error : " + err)
            return err
        })
        .on('end', async function() {
            stiker = await addExif(fs.readFileSync('./tmp/img.webp'), 'Ini weem bang', `${package.author}@${package.name}`)
            conn.sendMessage(m.chat, stiker, MessageType.sticker)
            fs.unlinkSync('./tmp/img.webp')
            fs.unlinkSync(media)
        })
        .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
        .toFormat('webp')
        .save('./tmp/img.webp')
    }
}