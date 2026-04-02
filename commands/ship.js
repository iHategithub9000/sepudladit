const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder } = require('discord.js');

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

        // Check if user wants to rig the result
        let percentage = Math.floor(Math.random() * 101);
        const rigArg = argv.find(arg => arg.startsWith("rig:"));
        if (rigArg) {
            const rigValue = parseInt(rigArg.split(":")[1]);
            if (!isNaN(rigValue) && rigValue >= 0 && rigValue <= 100) {
                percentage = rigValue;
            }
        }

        const embed = new EmbedBuilder()
            .setTitle("Compatibility")
            .setDescription(`${user1.username} and ${user2.username} are ${percentage}% compatible!`)
            .setColor(0x00ff00);

        msg.reply({ embeds: [embed] });
    }
}
