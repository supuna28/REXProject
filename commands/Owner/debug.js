module.exports = {
    name: "debug",
    owner: true,
    async run(m, { conn, args, text}) {
        console.log(m)
    }
}