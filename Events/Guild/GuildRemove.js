const { Client, Guild, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
    name: "guildDelete",

    /**
     * @param {Guild} guild 
     */
    async execute(guild) {

        const logsChannel = guild.client.channels.cache.get('989230936514248724')

        const { name, id, memberCount, ownerId } = guild

        const ownerName = guild.client.users.cache.get(ownerId).tag
        const size = guild.client.guilds.cache.size

        const logAddEmbed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle(`🈂 REMOVED FROM SERVER!`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addField('Guild Info', `${name} (${id}) | **${memberCount} members!**`)
            .addField('Owner Info', `<@${ownerId}> (${ownerId} | ${ownerName})`)
            .setFooter({ text: `Currently in ${size} Servers` })
            .setTimestamp()

        logsChannel.send({ embeds: [logAddEmbed] })

    }
}