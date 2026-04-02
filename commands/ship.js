const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder } = require('discord.js');

async function getLastDM(user) {
    try {
        const dmChannel = await user.createDM();
        const messages = await dmChannel.messages.fetch({ limit: 1 });
        return messages.first()?.content || null;
    } catch (err) {
        console.error("Failed to fetch last DM:", err);
        return null;
    }
}

module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: "",
    name: "ship",
    help_string: "<mention1> <mention2> - Ships two users together.",
    run: async (msg, argv, cl) => {
        if (argv.length < 3) {
            msg.reply("Please mention two users to ship together.");
            return;
        }

        const user1 = msg.mentions.users.first();
        const user2 = msg.mentions.users.last();
        if (!user1 || !user2) {
            msg.reply("Please mention two valid users.");
            return;
        }

        
        let percentage = Math.floor(Math.random() * 101);
        let lastdm = await getLastDM(msg.author);
        if (lastdm) if (lastdm.startsWith("rigShip: ")) percentage = lastdm.split(": ")[1]
        
        const embed = new EmbedBuilder()
            .setTitle("Compatibility")
            .setDescription(`${user1.username} and ${user2.username} are ${percentage}% compatible!`)
            .setColor(0x00ff00);

        msg.reply({ embeds: [embed] });
    }
}
