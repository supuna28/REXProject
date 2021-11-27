const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const { MessageType } = require('@adiwajshing/baileys')
const addExif = require('../../lib/exif')
const package = require('../../package.json')
const i18n = require('i18n')
module.exports = {
    name: ["sticker", "s"], 
    tags: "sticker",
    description: i18n.__('sticker.description'),
    group: false,
    admin: false, 
    botAdmin: false, 
    owner: false, 
    async run(m, { conn, args, text, isPremium }) {
        // fill your code here
        let user = global.db.users[m.sender]
        let stiker = false
        let isMedia = (m.type === 'imageMessage' || m.type === 'videoMessage' || m.quoted)
        if (!isMedia) throw i18n.__('failed.notQuoted')
        let q = m.quoted ? m.quoted : m
        let media = await q.download('./tmp/img')
        conn.reply(m.chat, i18n.__('sticker.process'), m)
        await ffmpeg(media)
        .input(media)
        .on('error', function (err) {
            console.log("Error : " + err)
            return err
        })
        .on('end', async function() {
          if (isPremium) {
            stiker = await addExif(fs.readFileSync("./tmp/img.webp"), user.packname || global.packname, user.author || global.author)
          } else stiker = await addExif(fs.readFileSync('./tmp/img.webp'), global.packname, global.author)
            conn.sendMessage(m.chat, stiker, MessageType.sticker)
            fs.unlinkSync('./tmp/img.webp')
            fs.unlinkSync(media)
        })
        .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
        .toFormat('webp')
        .save('./tmp/img.webp')
    }
}