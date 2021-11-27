const i18n = require("i18n")
module.exports = {
  name: "setwm",
  tags: "sticker",
  description: i18n.__("sticker.setwm.description"),
  premium: true,
  async run(m, { conn, text }) {
    let user = global.db.users[m.sender]
    if (!text) throw i18n.__mf("sticker.setwm.!text", { prefix: global.prefix })
    let [packname, ...author] = text.split("|")
    author = (author || []).join("|")
    user.packname = packname
    user.author = author
    conn.reply(m.chat, i18n.__("sticker.setwm.done"), m)
  }
}