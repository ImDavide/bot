const { CommandInteraction, MessageEmbed } = require('discord.js');


module.exports = {
    name: "embed",
    description: "Create custom embed",
    permission: "USE_APPLICATION_COMMANDS",
    options: [
        {
            name: "title",
            description: "Fornisci un nome per il tuo sondaggio",
            type: "STRING",
            required: true
        },
        {
            name: "image",
            description: "Image",
            type: "STRING",
            required: true
        },
        {
            name: "tag",
            description: "Tag user",
            type: "MENTIONABLE",
            required: true
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const { options }= interaction;

        const title = options.getString("title")
        const image = options.getString("image")
        const tag = options.getMentionable('tag')

        const Response = new MessageEmbed()
        .setTitle(`${title}`)
        .setDescription(`*By* ${interaction.member} for ${tag}`) 
        .setImage(`${image}`)
        .setColor("#2F3136")
        .setTimestamp()
        .setFooter({text: "DS Studios", iconURL: "https://cdn.discordapp.com/attachments/989230929362976828/990400243101233152/IMG-20220625-WA0017.jpg"})    
        const message = await interaction.reply({ content: 'Messaggio creato ✅', fetchReply:true, ephemeral: true})
        const masi = await interaction.channel.send({embeds: [Response]})
    }
} 