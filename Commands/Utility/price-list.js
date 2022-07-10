const { CommandInteraction, MessageEmbed } = require('discord.js');


module.exports = {
    name: "price",
    description: "Create custom embed",
    permission: "USE_APPLICATION_COMMANDS",


    async execute(interaction, client) {
        const { guild, member, user } = interaction
        const Embed = new MessageEmbed()

    .setTitle("DS Studios - Pricelist")
    .setDescription("<a:955148947423379526:995329371101466695>**・Portfolio**\n\nLogos ➜ 6€\nGifs ➜ 6€\nThumbnail Fivem ➜ 5€\nBanner ➜ 4€\nWallpaper ➜ 3€\nOutro ➜ 5€\nDrawings ➜ 7€\n\n<a:955148947423379526:995329371101466695>**・Bundles**\n\nLogo + Gif ➜ 7€\nDrawing + Thumbnail ➜ 8€\n\n<a:955148947423379526:995329371101466695>**・Payment Methods**\n\n**PayPal**, **Nitro**, are the only accepted methods\n\n <:987612992294252615:995745604842033152> - OPEN A TICKET IN <#986311016755384320> AND BUY NOW! -  <:si:986356619602448464>")
    .setThumbnail(guild.iconURL())
    .setColor("#034efc")
    .setTimestamp()
    .setFooter(guild.name, guild.iconURL())
     interaction.channel.send({ embeds: [Embed]})
     interaction.reply({ content: "✅ | Operation completed successfully.", ephemeral: true })
    }
}   
