const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    accessRestriction: RestrictionsEnum.DISCORD_PERMISSION,
    accessRestrictionArgs: PermissionsBitField.Flags.ManageRoles,
    name: "role",
    help_string: "<subcommand> [role] [member] - Role management",
    run: async (msg, argv, cl) => {
        try {
            const subcommands = ["add", "remove"];
            
            const sub = argv[1]; // "add" or "remove"
const memberMention = argv[argv.length - 1]; // last argument is the member
const roleName = argv.slice(2, argv.length - 1).join(" "); // everything in between is the role name

            if (!subcommands.includes(sub)) {
                return msg.reply(`Invalid subcommand. Use: add or remove.`);
            }

            if (!roleName || !memberMention) {
                return msg.reply(`Usage: %role <subcommand> [role] [member]`);
            }

            const role = msg.guild.roles.cache.find(r => r.name === roleName);
            if (!role) return msg.reply(`Role "${roleName}" not found.`);

            const member = msg.mentions.members.first() || msg.guild.members.cache.get(memberMention);
            if (!member) return msg.reply(`Member not found.`);

            if (sub === "add") {
                await member.roles.add(role);
                return msg.reply(`✅ Added role **${role.name}** to **${member.user.tag}**.`);
            } else if (sub === "remove") {
                await member.roles.remove(role);
                return msg.reply(`✅ Removed role **${role.name}** from **${member.user.tag}**.`);
            }

        } catch (e) {
            const embed = new EmbedBuilder()
                .setTitle(":x: Role failed.")
                .setDescription(`\`\`\`${e.stack}\`\`\``)
                .setColor(0xff0000);
            await msg.reply({ embeds: [embed] });
        }
    }
};
