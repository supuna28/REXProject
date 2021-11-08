const { GroupSettingChange } = require("@adiwajshing/baileys");
const i18n = require('i18n')
module.exports = {
    name: ['group', 'setgc'],
    tags: "admin",
    description: i18n.__mf('group.changesettings.description', { prefix: global.prefix }),
    group: true,
    admin: true,
    botAdmin: true,
    async run(m, { conn, text }) {
        if (!text) throw i18n.__('failed.textNotIncluded')
        switch (text) {
            case 'open': 
                await conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, false)
            break;
            case 'close':
                await conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, true)
            break;
            default: 
            let str = `Invalid format, example: ${prefix}group close\n\nList command that can you use:\n- ${prefix}group open\n- ${prefix}group close\n${global.poweredWatermark}`
            conn.reply(m.chat, str, m)
            break;
        }
    }
}