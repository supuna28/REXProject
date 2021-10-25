module.exports = async(conn, m) => {
    let user = conn.user
    let info = `>> ${user.phone.device_manufacturer} ${user.phone.device_model} | WhatsApp Version ${user.phone.wa_version}`.trim()
    let message = `>> [MSG] ${m.sender} to ${m.chat} | ${m.type ? m.type.replace(/message$/i, '').replace('audio', m.smessage.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) : ''}`
    let command = `>> [BOT] Executing ${m.command} from ${m.sender} in ${m.chat}`
    console.log(info)
    console.log(m.isCommand ? command : message)
    console.log()
}