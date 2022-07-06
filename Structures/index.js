const Discord = require("discord.js")
const intents = new Discord.Intents(32767)
const client = new Discord.Client({
    intents,
    partials: ["CHANNEL", "GUILD_MEMBER", "REACTION", "MESSAGE", "GUILD_SCHEDULED_EVENT", "USER"],
    allowedMentions: { parse: ["users", "everyone", "roles"] },
})

require("dotenv").config()

const { promisify } = require("util")
const { glob } = require("glob")
const PG = promisify(glob)
const Ascii = require("ascii-table")

const { DisTube } = require("distube")
const { SpotifyPlugin } = require("@distube/spotify")

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
})

module.exports = client

client.commands = new Discord.Collection();

// Require the files inside handler and pass "client, PG & Ascii" through them
// Remember, maintaining the order is important
["Events", "Commands"].forEach(handler => {

    require(`./Handlers/${handler}`)(client, PG, Ascii)

});

require(`./Handlers/Events_N`)(client, Discord)

client.login("OTkwNzA2MTc0OTMwMzI1NTY0.GfGlC2.ElJoUXXev4hPMHhf1oxYi41_4MVusjuRruNhWM")
