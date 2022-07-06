const { Client, SelectMenuInteraction, MessageEmbed, ButtonInteraction } = require("discord.js")
const db = require("../../Structures/Schemas/Verification")

module.exports = {
    name: "interactionCreate",

    /**
     * @param {ButtonInteraction} interaction
     * @param {Client} client 
     */
    async execute(interaction, client) {

        if (!interaction.isButton()) return

        const { guild, customId, member, message } = interaction


        switch (interaction.customId) {
            case "verification_verify":
                {
                    const Data = await db.findOne({ Guild: guild.id }).catch(err => { })
                    //console.log(Data)
                    if (!Data) return interaction.reply({ embeds: [new MessageEmbed().setDescription("Unable to find this data.").setColor("#0066FF")] })

                    const RoleToFind = guild.roles.cache.get(Data.Role)
                    //console.log(RoleToFind)
                    if (!RoleToFind) return interaction.reply({ embeds: [new MessageEmbed().setDescription("Verification role not found.").setColor("#0066FF")] })

                    if (guild.me.roles.highest.position <= Data.Role.position) return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("#0066FF")
                                .setDescription(`Unable to verify. This role is higher than my role.`)
                        ], ephemeral: true
                    })

                    if (guild.me.roles.highest.position <= member.roles.highest.position) return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor("#0066FF")
                                .setDescription(`Unable to verify. Your current role is higher than my role.`)
                        ], ephemeral: true
                    })



                    const Role = guild.roles.cache.get(Data.Role)
                    if (interaction.member.roles.cache.has(Data.Role)) {
                        return interaction.reply({
                            embeds: [new MessageEmbed()
                                .setColor("#0066FF")
                                .setDescription(`You are already verified!`)                         
                            ], ephemeral: true
                        }).catch(() => { });
                    }

                    await interaction.reply({ embeds: [new MessageEmbed().setColor("#0066FF").setDescription("Verified successfully.")], ephemeral: true })
                    return interaction.member.roles.add(Role).catch(() => { });

                }
        }
    }
}
