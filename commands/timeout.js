const { RestrictionsEnum } = require("../commandAccessRestrictions.js");

const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    accessRestriction: RestrictionsEnum.DISCORD_PERMISSION,
    accessRestrictionArgs: PermissionsBitField.Flags.ModerateMembers,
    name: "timeout",
    help_string: "<user> <time | \"remove\"> - Times out a member. Requires Moderate Members permission.",
    run: async (msg, argv, cl) => {
        try {
            const user = msg.mentions.users.first();
            if (!user) {
                const embed = new EmbedBuilder()
                    .setTitle(":x: No user mentioned.")
                    .setDescription("Please mention a user to timeout.")
                    .setColor(0xff0000);
                return msg.reply({ embeds: [embed] });
            }
            const member = msg.guild.members.cache.get(user.id);
            if (!member) {
                const embed = new EmbedBuilder()
                    .setTitle(":x: User not found.")
                    .setDescription("The mentioned user is not a member of this server.")
                    .setColor(0xff0000);
                return msg.reply({ embeds: [embed] });
            }
            const timeArg = argv[2];
            if (!timeArg) {
                const embed = new EmbedBuilder()
                    .setTitle(":x: No time specified.")
                    .setDescription("Please specify a time for the timeout, or \"remove\" to remove the timeout.")
                    .setColor(0xff0000);
                return msg.reply({ embeds: [embed] });
            }
            if (timeArg.toLowerCase() === "remove") {
                await member.timeout(null);
                const embed = new EmbedBuilder()
                    .setTitle(":white_check_mark: Timeout removed.")
                    .setColor(0x00ff00);
                return msg.reply({ embeds: [embed] });
            }
            const time = parseInt(timeArg);
            if (isNaN(time) || time < 0 || time > 2419200) {
                const embed = new EmbedBuilder()
                    .setTitle(":x: Invalid time specified.")
                    .setDescription("Please specify a valid time in seconds (0-2419200), or \"remove\" to remove the timeout.")
                    .setColor(0xff0000);
                return msg.reply({ embeds: [embed] });
            }
            await member.timeout(time * 1000);
            const embed = new EmbedBuilder()
                .setTitle(":white_check_mark: Timeout applied.")
                .setDescription(`Timed out ${user.tag} for ${time} seconds.`)
                .setColor(0x00ff00);
            await msg.reply({ embeds: [embed] });
        } catch (e) {
            const embed = new EmbedBuilder()
                .setTitle(":x: Timeout failed.")
                .setDescription(`\`\`\`${e.stack}\`\`\``)
                .setColor(0xff0000);
            await msg.reply({ embeds: [embed] });
        }
    }
}