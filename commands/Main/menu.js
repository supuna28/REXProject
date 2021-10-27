// Soon i code it :), first lemme code the banner icon
const { MessageType } = require('@adiwajshing/baileys')
const { spawn } = require('child_process')
const fs = require('fs')
let buffs = []

module.exports = {
    name: "menu", 
    group: false,
    admin: false, 
    botAdmin: false, 
    owner: false, 
    async run(m, { conn, args, text }) {
        let tags = 'Coming soon'
        spawn('convert', [
            './src/bg.png',
            '-gravity',
            'Center',
            '-font',
            './src/poppins.ttf',
            '-pointsize',
            '100',
            '-fill',
            '#FFFFFF',
            '-annotate',
            '0',
            tags + ".",
            './src/menu_tags.png'
        ])
        .on('exit', async () => {
            console.log('>> Generated menu picture.')
            await conn.send2ButtonLoc(m.chat, fs.readFileSync('./src/menu_tags.png'), '*_Just a beta image for menu_*', global.footerText, 'Owner bot', `${global.prefix}owner`, 'Donasi', `${global.prefix}donate`)
        })
    }
}