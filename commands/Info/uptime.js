module.exports = {
  name: "uptime",
  tags: "info",
  async run(m, { conn }) {
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    conn.reply(m.chat, `Uptime ${uptime}`, m)
  }
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}