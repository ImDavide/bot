const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Mostra l'avatar di una persona",
    options: [
        {
            name: "tag",
            description: "Seleziona la persona che vuoi taggare",
            type: "USER",
            required: true,
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        const { options } = interaction;
        const Target = options.getUser("tag");
        const { guild, member, user } = interaction
        const Response = new MessageEmbed()
            .setAuthor({ name: `${Target.username}\'s Avatar`, iconURL: `${Target.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setImage(`${Target.displayAvatarURL({ dynamic: true, size: 4096 })}`)
            .setColor("#034efc")
            .setFooter(guild.name, guild.iconURL())
            
            .setTimestamp();
    
            const row = new MessageActionRow()
            .addComponents(
        new MessageButton()
            .setLabel('Download')
            .setEmoji(`<a:s_:991382924089897072>`)
            .setURL(Target.displayAvatarURL({ size: 4096, dynamic: true }))
            .setStyle('LINK')

            )
    
        interaction.reply({ embeds: [Response], components: [row] });
    }
}
