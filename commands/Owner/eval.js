const util = require("util")
module.exports = {
  name: new RegExp,
  customPrefix: ">",
  rowner: true,
  async run(m, { conn, text, usedPrefix }) {
    try {
      let data = eval(m.text.slice(usedPrefix.length + 1))
      if (typeof data !== "string") data = util.inspect(data)
      conn.reply(m.chat, data, m)
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}