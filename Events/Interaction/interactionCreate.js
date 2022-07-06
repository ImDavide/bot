const { Client, CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
    name: "interactionCreate",

    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client 
     */

    async execute(interaction, client) {

        // Create interactions for context menu and for slash commands
        if (interaction.isCommand() || interaction.isContextMenu()) {

            // This part is basically the same as previous videos
            const command = client.commands.get(interaction.commandName)

            // If there is no command it will delete the command
            if (!command) return interaction.reply({

                embeds: [
                    new MessageEmbed()
                        .setColor("BLUE")
                        .setDescription("‼️ - An error occurred while running the command")
                ], ephemeral: true

            }) && client.commands.delete(interaction.commandName)

            if (command.permission) {
                if (!interaction.member.permissions.has(command.permission)) return interaction.reply({
                
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("BLUE")
                                        .setDescription(":bangbang: - You don't have perms!")
                                ], ephemeral: true
                
                            })
                }
            // Executing the command
            command.execute(interaction, client)

        }

    }

}