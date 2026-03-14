const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: "",
    name: "roleinfo",
    help_string: "<role mention|role id|role name> - Displays information about a role.",
    run: async (msg, argv, cl) => {
        if (!msg.guild) {
            await msg.reply("This command only works in servers.");
            return;
        }

        let role = msg.mentions.roles.first();
        if (!role) {
            const maybeId = argv[1];
            if (maybeId) {
                role = msg.guild.roles.cache.get(maybeId);
            }
        }

        if (!role && argv.length > 1) {
            const roleName = argv.slice(1).join(" ").toLowerCase();
            role = msg.guild.roles.cache.find(r => r.name.toLowerCase() === roleName);
        }

        if (!role) {
            role = msg.member.roles.highest;
        }

        const membersWithRole = msg.guild.members.cache.filter(m => m.roles.cache.has(role.id));
        const createdAt = role.createdAt ? role.createdAt.toDateString() : "Unknown";
        const permissions = role.permissions.toArray();

        const embed = new EmbedBuilder()
            .setTitle(`Role Information - ${role.name}`)
            .setDescription(`Name: ${role.name}\nID: ${role.id}\nColor: ${role.hexColor}\nHoist: ${role.hoist ? "Yes" : "No"}\nMentionable: ${role.mentionable ? "Yes" : "No"}\nManaged: ${role.managed ? "Yes" : "No"}\nPosition: ${role.position}\nCreated At: ${createdAt}\nMembers: ${membersWithRole.size}\nPermissions: ${permissions.length > 0 ? permissions.join(", ") : "None"}`)
            .setColor(role.color || 0x00ff00)
            

        await msg.reply({ embeds: [embed] });
    }
};
