const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    accessRestriction: RestrictionsEnum.DISCORD_PERMISSION,
    accessRestrictionArgs: PermissionsBitField.Flags.ManageChannels,
    name: "lockdown",
    help_string: "<on|off> - Lock or unlock the current channel",
    run: async (msg, argv, cl) => {
        try {
            const action = argv[1]; // "on" or "off"
            if (!["on", "off"].includes(action)) return msg.reply("Usage: %lockdown <on|off>");

            const everyone = msg.guild.roles.everyone;
            const channel = msg.channel;

            const perms = action === "on"
                ? {
                    SendMessages: false,
                    AddReactions: false,
                    SendMessagesInThreads: false,
                    CreatePublicThreads: false,
                    CreatePrivateThreads: false
                }
                : {
                    SendMessages: null,
                    AddReactions: null,
                    SendMessagesInThreads: null,
                    CreatePublicThreads: null,
                    CreatePrivateThreads: null
                };

            await channel.permissionOverwrites.edit(everyone, perms);

            return msg.reply(action === "on" ? "Channel locked!" : "Channel unlocked!");

        } catch (e) {
            const embed = new EmbedBuilder()
                .setTitle(":x: Lockdown failed")
                .setDescription(`\`\`\`${e.stack}\`\`\``)
                .setColor(0xff0000);
            await msg.reply({ embeds: [embed] });
        }
    }
};
