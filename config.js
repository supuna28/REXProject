global.prefix = 'x!'; // fill your default prefix in here
global.language = 'id'; // choose an language, just available english and indonesian only


global.msgFail = { // you can add another message with your own language
    en: {
        owner: "[ ❗ ] *_This command can only used by the owner!_*",
        notGroup: "[ ❗ ] *_This command can only used on a group!_*",
        notAdmin: "[ ❗ ] *_This command can only used by the administrator group!_*",
        notBotAdmin: "[ ❗ ] *_Please promote this bot as administrator group for using this command!_*",
        notMentioned: "[ ❗ ] *_Tag the user_*",
        notQuoted: "[ ❗ ] *_Please reply or quote a media message!_*"
    },
    id: {
        owner: "[ ❗ ] *_Perintah ini hanya bisa digunakan oleh pemilik bot!_*",
        notGroup: "[ ❗ ] *_Perintah ini hanya bisa digunakan di grup!_*",
        notAdmin: "[ ❗ ] *_Perintah ini hanya bisa digunakan oleh admin grup!_*",
        notBotAdmin: "[ ❗ ] *_Mohon promosikan bot ini menjadi admin grup untuk menggunakan perintah ini!_*",
        notMentioned: "[ ❗ ] *_Tag membernya_*",
        notQuoted: "[ ❗ ] *_Reply sebuah pesan berisi foto atau video!_*"
    }
}

global.msgBot = { // you can add another message with your own language
    en: {
        wait: "[ ⌛ ] *_Loading, please wait..._*",
        stickerWait: "[ ⌛ ] *_Processing the sticker, please wait..._*",
        afterAdmin: "[ ❗ ] *_INFO : Please don't use admin command too frequently, because can lead bot number to be blocked._*",
        support: `[ 💬 ] *_Thank you for using this bot, considering you can donate us on "${global.prefix}donate"_*`
    },
    id: {
        wait: "[ ⌛ ] *_Loading, mohon tunggu..._*",
        stickerWait: "[ ⌛ ] *_Memproses stiker, mohon tunggu..._*",
        afterAdmin: "[ ❗ ] *_INFO : Mohon jangan menggunakan perintah admin terlalu sering, karena bisa menyebabkan nomor bot terblokir._*",
        support: `[ 💬 ] *_Terima kasih telah menggunakan bot ini, anda dapat donasi kami di perintah "${global.prefix}donate"_*`
    }
}