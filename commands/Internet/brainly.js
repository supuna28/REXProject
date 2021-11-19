const br = require('brainly-scraper-v2')
const Brainly = new br('id')
const i18n = require('i18n')

module.exports = {
    name: "brainly",
    tags: "internet",
    async run(m, { conn, text }) {
        if (!text) throw i18n.__('brainly.!query')
        try {
            let res = await Brainly.search('id', text)
            let ans = res.map(({ question, answer }, i) => `
_*Question ${i + 1}*_
${formatTags(question.content)}${answers.map((v, i) => `
*Answer ${i + 1}*${v.verification ? ' (Verified)' : ''}${v.isBest ? ' (Best selected answer)' : ''}
${formatTags(v.content)}`).join``}`).join(`
---------------
            `)
            conn.reply(m.chat, ans, m)
        } catch (e) {
            console.log(e.message)
            if (e.message === 'HTTPError: Response code 403 (Forbidden)') return conn.reply(m.chat, i18n.__('brainly.403'), m)
        }
    }
}

// Thanks to Nurutomo
function formatTags(str) {
    let tagRegex = /<(.+?)>((?:.|\n)*?)<\/\1>/gi
    let replacer = (_, tag, inner) => {
      let a = inner.replace(tagRegex, replacer)
      let b = ''
      switch (tag) {
        case 'p':
          a += '\n'
          break
        case 'i':
          b = '_'
        case 'strikethrough':
          b = '~'
        case 'strong':
          b = '*'
          a = a.split('\n').map(a => a ? b + a + b : a).join('\n')
          break
      }
      return a
    }
    
    return str
      .replace(/<br *?\/?>/gi, '\n')
      .replace(tagRegex, replacer)
      .trim()
  }