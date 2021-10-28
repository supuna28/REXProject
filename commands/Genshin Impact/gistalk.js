// Coming soon for this command
const gi = require('@rthelolchex/genshininfo_scraper')
module.exports = {
    name: "gistalk",
    async run(m, { conn, text, args }) {
        if (!text) throw global.msgFail[global.language].idNotIncluded
        let data = await gi.GetUserProfile()
    }
}