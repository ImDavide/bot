const { Client, MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js")
const model = require('../../Structures/Schemas/Verification')
// This is our new layout for executing the slash commands
module.exports = {
    name: "config-verification",
    description: "A complete system of guild verification",
    userPermissions: "MANAGE_GUILD",
    botPermissions: "MANAGE_GUILD",
    owner: false,
    category: "Config",
    cooldown: '5s',
    options: [
        {
            name: "set",
            description: "A channel where to send the verification.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "role",
                    description: "Select a role to give when a user is verified",
                    type: "ROLE",
                    required: true,
                },
                {
                    name: "channel",
                    description: "Select a channel where to send the verification.",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"],
                    required: true,
                }
            ],

        }, {
            name: "disable",
            description: "Disable the verification system.",
            type: "SUB_COMMAND",

        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    async execute(interaction, client) {
        const Sub = interaction.options.getSubcommand()
        switch (Sub) {
            case "set": {

                const channel = interaction.options.getChannel('channel')
                const role = interaction.options.getRole('role')
                let data = await model.findOne({ Guild: interaction.guild.id });

                if (data) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("#0066FF")
                            .setDescription(`Verification setup is already exists in this guild.`)
                    ],
                    ephemeral: true
                })

                if (role.position >= interaction.guild.me.roles.highest.position) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor("#0066FF")
                            .setDescription(`This role is higher than my role.`)
                    ],
                    ephemeral: true
                })


                model.findOne({ Guild: interaction.guild.id }, async (err, data) => {

                    if (err) throw err

                    if (data) {

                        data.delete()

                        data = new model({
                            Guild: interaction.guild.id,
                            Role: role.id,
                            Channel: channel.id
                        })
                        await data.save()

                    } else {

                        data = new model({
                            Guild: interaction.guild.id,
                            Role: role.id,
                            Channel: channel.id

                        })
                        await data.save()

                    }

                    await channel.send({
                        embeds: [new MessageEmbed()
                            .setColor("#0066FF")
                            .setAuthor({ name: 'DS Studios®', iconURL: 'https://cdn.discordapp.com/attachments/989230929362976828/990400243101233152/IMG-20220625-WA0017.jpg' })
                            .setThumbnail("https://cdn.discordapp.com/attachments/989230929362976828/990400243101233152/IMG-20220625-WA0017.jpg")
                            .setTimestamp()
                            .setFooter({ text: 'DS Studios®', iconURL: 'https://cdn.discordapp.com/attachments/989230929362976828/990400243101233152/IMG-20220625-WA0017.jpg' })
                            .setDescription(`To access \`${interaction.guild.name}\`, you need to click the verification \nbutton first and you will verify yourself.`)],
                        components: [new MessageActionRow().addComponents(new MessageButton().setLabel(`Verify`).setEmoji("<:check:991064935289212938>").setCustomId("verification_verify").setStyle("SECONDARY"))]
                    })
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("#0066FF")
                                .setDescription(`${client.success} Successfully set the verification channel to ${channel}.`)
                        ]
                    })
                })
            }
                break;
            case "disable": {
                model.findOne({ Guild: interaction.guild.id }, async (err, data) => {

                    if (err) throw err

                    if (data) {

                        data.delete()

                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor(client.color)
                                    .setDescription(`Verification system disabled successfully..`)

                            ]
                        })

                    } else {

                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("#0066FF")
                                    .setDescription(`Verification system is already disabled.`)

                            ]
                        })
                    }
                })


            }
        }
    }

}