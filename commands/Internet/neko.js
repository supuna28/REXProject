const { waifupics } = require('../../lib/scrape')
const i18n = require('i18n')
module.exports = {
    name: 'neko',
    tags: 'internet',
    description: i18n.__('internet.waifupics.neko.description'),
    async run(m, { conn }) {
        const data = await waifupics.sfw('neko')
        if (!data.url) throw i18n.__('failed.error')
        return conn.sendFile(m.chat, data.url, '', '', m)
    }
}