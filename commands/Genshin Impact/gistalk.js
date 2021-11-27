// Coming soon for this command
const gi = require('@rthelolchex/genshininfo_scraper')
const i18n = require('i18n')
module.exports = {
    name: "gistalk",
    tags: "gi",
    description: i18n.__('gi.stalk.description'),
    async run(m, { conn, text, args }) {
        let owner = global.db.users[global.owner + '@s.whatsapp.net']
        let user = global.db.users[m.sender]
        let cookieToken = owner.GICookie || user.GICookie
        if (!cookieToken) throw i18n.__mf('gi.cookieNotFound', { prefix: global.prefix })
        if (!text) throw i18n.__('failed.idNotIncluded')
        if (isNaN(text)) throw i18n.__('failed.isNaN')
        let data = await gi.GetUserProfile(cookieToken, text)
        let spiral_abyss_1 = await gi.spiralAbyss(cookieToken, text, '1')
        let spiral_abyss_2 = await gi.spiralAbyss(cookieToken, text, '2')
        if (spiral_abyss_1.data.is_unlock == false) {
            spiral_abyss_1 = {
                data: {
                    max_floor: '0-0'
                }
            }
        }
        if (spiral_abyss_2.data.is_unlock == false) {
            spiral_abyss_2 = {
                data: {
                    max_floor: '0-0'
                }
            }
        }
        if (data) {
            let user_data = await gi.simpleUserStats(data)
            let character = await gi.simpleCharacterList(data)
            let spiralAbyss_1 = await gi.simpleSpiralAbyss(spiral_abyss_1)
            let spiralAbyss_2 = await gi.simpleSpiralAbyss(spiral_abyss_2)
            let worldExploration = await gi.simpleWorldExplorations(data)
            let homepot = await gi.simpleHomePot(data)
            return conn.reply(m.chat, `--- Genshin Impact Stalk ---\nUID : ${text}\n\n--- User Stats ---\n${user_data}\n\n--- Character List ---\n${character}\n\n--- World Explorations ---\n${worldExploration}\n\n--- Spiral Abyss ---\nToday\n${spiralAbyss_1}\n\nLast week\n${spiralAbyss_2}\n\n--- Home Pot ---\n${homepot}\n\n${global.footerText}`, m)
        } else throw "Getting data failed"
    }
}