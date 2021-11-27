const { waifupics } = require('../../lib/scrape')
const i18n = require('i18n')
module.exports = {
    name: 'megumin',
    tags: 'internet',
    description: i18n.__('internet.waifupics.megumin.description'),
    async run(m, { conn }) {
        const data = await waifupics.sfw('megumin')
        if (!data.url) throw i18n.__('failed.error')
        return conn.sendFile(m.chat, data.url, '', '', m)
    }
}   