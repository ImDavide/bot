const { Client, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
    name: "ban-list",
    description: "Lists all the banned member",
    permission: "MANAGE_GUILD",

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {

        const { guild, member, user } = interaction

        const bannedMembers = await guild.bans.fetch()

        const banned = bannedMembers.map((x) => `• ${x.user.tag} | ${x.user.id} | ${x.user}`).join("\n")

        const Embed = new MessageEmbed()
            .setTitle("Banned Members")
            .setDescription(`${banned}`)
            .setTimestamp()
            .setColor("BLUE")
            .setFooter({ text: "Banned List by Drago" })

        return interaction.reply({
            embeds: [Embed]
        })

    }
}