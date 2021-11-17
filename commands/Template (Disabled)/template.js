const i18n = require('i18n')
module.exports = {
    name: "",
    description: i18n.__(""),
    tags: '',
    group: false,
    admin: false, 
    botAdmin: false, 
    owner: false,
    disabled: true,
    async run(m, { conn, args, text }) {
        // fill your code here
    }
}

// This is an template for making a new commands, you can copy and paste it

/** Hint : 
 * name : Name of the command, just string, coming soon i will add if it's array or RegExp
 * description : Add a description for new command on locales folder
 * tags : Make the command on some category
 * group : if you wanna use the command on group only
 * admin : if you wanna use the command just for administrator only ( only group )
 * botAdmin : if the user admin but the bot is not admin, the command can't be executed
 * owner : if you wanna use the command just for yourself
 * run function : fill the code in there, if you wanna add additional function, check chatHandler on line 45 for extra functions;
 * example : (m, { args, text, ..etc })
 */