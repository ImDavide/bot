const { Client, MessageEmbed, ContextMenuInteraction, Permissions, MessageActionRow , MessageButton } = require("discord.js")

module.exports = {
    name: "Avatar",
    type: "USER",
    context: true,
    category: "Context",

    /**
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     */
    async execute(interaction, client) {

        const { guild, user, targetId } = interaction

        const target = await guild.members.fetch(targetId)

        const Embed = new MessageEmbed()
            .setColor("#034efc")
            .setAuthor({ name: `${target.user.username}\'s Avatar`, iconURL: `${target.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setImage(`${target.displayAvatarURL({ dynamic: true, size: 4096 })}`)
            .setFooter(guild.name, guild.iconURL())
            .setTimestamp()

            const row = new MessageActionRow()
            .addComponents(
        new MessageButton()
            .setLabel('Download')
            .setEmoji(`<a:s_:991382924089897072>`)
            .setURL(target.displayAvatarURL({ size: 4096, dynamic: true }))
            .setStyle('LINK')

            )

        return interaction.reply({ embeds: [Embed], components: [row]})

    }
}
