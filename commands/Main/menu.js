// Soon i code it :), first lemme code the banner icon
const { MessageType } = require('@adiwajshing/baileys')
const { spawn } = require('child_process')
const fs = require('fs')
const i18n = require('i18n')

module.exports = {
    name: ["menu", "help"],
    tags: "main",
    description: i18n.__("menu.description"),
    group: false,
    admin: false, 
    botAdmin: false, 
    owner: false, 
    async run(m, { conn, args, text }) {
        let tags = {
            'admin': "Administrator",
            'downloader': "Downloader",
            'gi': "Genshin Impact",
            "info": "Info",
            'main': "Main",
            'owner': 'Owner',
            'sticker': 'Sticker'
        }
        let catBanner = 'All'
        let pushname = conn.getName(m.sender)
        let userinfo = i18n.__mf("menu.user", { pushname: pushname })
        let header = ">>> *%category* <<<"
        let middle = "=> _*%command*_ %isMaintenance\n```%description```"
        let footer = "<><><><><><><><><><>"
        let help = Object.values(global.commands).filter(cmd => !cmd.disabled).map(cmd => {
            return {
                help: Array.isArray(cmd.name) ? cmd.name.join(`, ${global.prefix}`) : [cmd.name],
                tags: Array.isArray(cmd.tags) ? cmd.tags : [cmd.tags],
                description: cmd.description ? cmd.description : i18n.__('!desc'),
                maintenance: cmd.maintenance ? true : false
            }
        })
        let groups = {}
        for (let tag in tags) {
            groups[tag] = []
            for (let cmd of help)
            if (cmd.tags && cmd.tags.includes(tag))
            if (cmd.help) groups[tag].push(cmd)
        }
        let body =  [
            userinfo,
            ...Object.keys(tags).map(tag => {
                return header.replace(/%category/g, tags[tag]) + '\n' + [
                    ...help.filter(cmd => cmd.tags && cmd.tags.includes(tag) && cmd.help).map(cmd => {
                        return middle.replace(/%command/g, global.prefix + cmd.help)
                        .replace(/%isMaintenance/g, cmd.maintenance ? "(Maintenance)" : "")
                        .replace(/%description/g, cmd.description ? cmd.description : i18n.__('!desc'))
                        .trim()
                    }),
                ].join('\n\n') + '\n' + footer
            }),
        ].join('\n\n')
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
            catBanner + ".",
            './src/menu_tags.png'
        ])
        .on('exit', async () => {
            await conn.send2ButtonLoc(m.chat, await fs.readFileSync('./src/menu_tags.png'), body, global.footerText, 'Owner bot', `${global.prefix}owner`, 'Donasi', `${global.prefix}donate`)
        })
    }
}