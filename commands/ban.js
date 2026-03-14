const { RestrictionsEnum } = require("../commandAccessRestrictions.js");

const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    accessRestriction: RestrictionsEnum.DISCORD_PERMISSION,
    accessRestrictionArgs: PermissionsBitField.Flags.BanMembers,
    name: "ban",
    help_string: "<user> [reason] - Bans a user from the server. Requires Ban Members permission.",
    run: async (msg, argv, cl) => {
        try {
            const user = msg.mentions.users.first();
            if (!user) {
                const embed = new EmbedBuilder()
                    .setTitle(":x: No user mentioned.")
                    .setDescription("Please mention a user to ban.")
                    .setColor(0xff0000);
                return msg.reply({ embeds: [embed] });
            }
            const reason = argv.slice(2).join(" ") || "No reason provided.";
            const member = msg.guild.members.cache.get(user.id);
            if (!member) {
                const embed = new EmbedBuilder()
                    .setTitle(":x: User not found.")
                    .setDescription("The mentioned user is not a member of this server.")
                    .setColor(0xff0000);
                return msg.reply({ embeds: [embed] });
            }
            await member.ban({ reason });
            const embed = new EmbedBuilder()
            .setTitle(":white_check_mark: Ban executed.")
            .setColor(0x00ff00)
            await msg.reply({embeds:[embed]})
        } catch (e) {
            const embed = new EmbedBuilder()
            .setTitle(":x: Ban failed.")
            .setDescription(`\`\`\`${e.stack}\`\`\``)
            .setColor(0xff0000)
            await msg.reply({embeds:[embed]})
        }
    }
}