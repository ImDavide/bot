const {MessageEmbed, GuildMember, Client} = require("discord.js");

 
module.exports = {
    name: "userUpdate",
    /**
     * 
     * @param {GuildMember} oldUser
     * @param {GuildMember} newUser
     * @param {Client} client
     */
async execute(oldUser, newUser, client) {
    // console.log(oldUser, newUser, client)

const log = ("995379652388466708");
const embed1 = new MessageEmbed()

  .setAuthor("DS Studios", "https://cdn.discordapp.com/attachments/989230929362976828/990400243101233152/IMG-20220625-WA0017.jpg")
  .setImage(newUser.displayAvatarURL({ size: 4096, dynamic: true }))
  .setColor("#034efc")
  .setFooter(`User: ${newUser.id}`, "https://cdn.discordapp.com/attachments/989230929362976828/990400243101233152/IMG-20220625-WA0017.jpg")
  
  if(oldUser !== newUser) {
    client.channels.cache.get(log).send({embeds: [embed1]})  
  }
}
}
