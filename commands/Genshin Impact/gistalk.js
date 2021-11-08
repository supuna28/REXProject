// Coming soon for this command
const gi = require('@rthelolchex/genshininfo_scraper')
const i18n = require('i18n')
module.exports = {
    name: "gistalk",
    tags: "gi",
    description: i18n.__('gi.stalk.description'),
    maintenance: true,
    async run(m, { conn, text, args }) {
        // if (!text) throw i18n.__('failed.idNotIncluded')
        // let data = await gi.GetUserProfile()
    }
}