const {MessageEmbed, GuildMember} = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member
     */
async execute(member) {
    const { user, guild } = member;
    const logsChannel = guild.client.channels.cache.get("989230949164269578");
    const dateText = `<t:${Math.round(new Date().getTime() / 1000)}>` 
    const embed = new MessageEmbed()
              .setColor("#0066FF")
              .setAuthor({name: `${member.user.tag}`, iconURL: `${member.user.displayAvatarURL()}`})
              .setDescription(`Hi ${member.user}, Welcome to **DS Studios** \n \n Verify in the channel <#989230952045744208>`)
              .setThumbnail(member.user.displayAvatarURL())
              .setTimestamp()
              .setFooter({ text:`DS Studios®`, iconURL: `https://cdn.discordapp.com/attachments/937817949560012830/994703931307474953/davide_studios.png`})
              .setImage("https://cdn.discordapp.com/attachments/937817949560012830/994703773018636308/Senza_titolo-2.png")
          
        await logsChannel.send({ 
      embeds: [embed]
    })
  }
}



// client.on('guildMemberAdd', member => {
//     const dateText = `<t:${Math.round(new Date().getTime() / 1000)}>` 
//     const embed = new MessageEmbed()
//       .setColor("#ff0000")
//         .setAuthor(`${member.user.tag}`, `${member.user.displayAvatarURL()}`)
//               .setDescription(`Hi ${member.user}, Welcome to **Samurai Services** \n \n Verify in the channel <#968239359214125076>`)
//               .setThumbnail(member.user.displayAvatarURL())
//               .setTimestamp()
//       .setFooter(`Samurai Services®`, `https://cdn.discordapp.com/attachments/947065424980344913/986669837730345050/samurai_serviesss.png`)
//         .setImage("https://cdn.discordapp.com/attachments/947065424980344913/987431809388277771/welcome_fors_smp.png")
          
//     let channel = "975705862494625802"
//     client.channels.cache.get(channel).send({
//       embeds: [embed]
//     })
//   })
