const { GroupSettingChange } = require("@adiwajshing/baileys");

module.exports = {
    name: ['group', 'setgc'],
    group: true,
    admin: true,
    botAdmin: true,
    async run(m, { conn, text }) {
        if (!text) throw global.msgFail[global.language].textNotIncluded
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