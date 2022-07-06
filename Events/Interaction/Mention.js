const { Client, Message, MessageEmbed, CommandInteraction, MessageButton, MessageActionRow } = require("discord.js")
const ms = require("ms")

module.exports = {
    name: "messageCreate",

    /**
     * @param {Message} message 
     */
    async execute(message) {

        const { author, guild, content, client } = message

        if (!guild || author.bot) return
        if (content.includes("@here") || content.includes("@everyone")) return

        if (content.includes(client.user.id)) {

            message.reply({

                embeds: [
                    new MessageEmbed()
                        .setColor('#0066FF')
                        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                        .setDescription(`Hey, you called me? Nice to meet you.\n\n*This message will be deleted in \`10 seconds\`!*`)
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                        .setFooter({ text: 'DS Studios' })
                        .setTimestamp()
                ],

                components: [
                    new MessageActionRow().addComponents(

                        new MessageButton()
                            .setStyle('LINK')
                            .setURL('https://discord.com/channels/989228630792110171/989230966709051473')
                            .setLabel('Buy'),

                    )
                ]

            }).then(msg => {

                setTimeout(() => {

                    msg.delete().catch((err) => {

                        if (err.code !== 10008) return console.log(err)

                    })

                }, ms("10s"))

            })

        }

    }
}