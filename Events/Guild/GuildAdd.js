const { Client, Guild, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
    name: "guildCreate",

    /**
     * @param {Guild} guild
     */
    async execute(guild) {

        const logsChannel = guild.client.channels.cache.get("989230936514248724")

        const { client, name, id, memberCount, ownerId } = guild

        const ownerName = client.users.cache.get(ownerId).tag
        const size = client.guilds.cache.size

        const Embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle("🈂 NEW SERVER")
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields([
                { name: "Guild Info", value: `${name} ${(id)} | **${memberCount} members**` },
                { name: "Owner Info", value: `<@${ownerId}> ${(ownerId)} | ${ownerName}` },
            ])
            .setFooter({ text: `Currently in ${size} Servers!` })
            .setTimestamp()

        logsChannel.send({ embeds: [Embed] })

    }
}