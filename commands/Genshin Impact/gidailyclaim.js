const gi = require('@rthelolchex/genshininfo_scraper')
const i18n = require('i18n')
module.exports = {
    name: "gidailyclaim",
    tags: "gi",
    description: i18n.__('gi.dailyclaim.description'),
    async run(m, { conn, text }) {
        let user = global.db.users[m.sender]
        if (!user.GICookie) throw i18n.__mf('gi.cookieNotFound', { prefix: global.prefix })
        let reward = await gi.ClaimDailyCheckIn(user.GICookie)
        let listClaimed = await gi.getClaimedRewards(user.GICookie)
        if (reward) {
            if (reward.message === `Traveler, you've already checked in today~`) return conn.reply(m.chat, `Anda sudah mengklaim daily hari ini\nTerakhir anda claim: x${listClaimed.data.list[0].cnt} ${listClaimed.data.list[0].name}`, m)
            if (reward.message === "OK") conn.reply(m.chat, i18n.__mf('gi.dailyclaim.success', { value: listClaimed.data.list[0].cnt, item: listClaimed.data.list[0].name }), m)
        }
    }
}