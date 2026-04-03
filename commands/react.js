const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
module.exports = {
    accessRestriction: RestrictionsEnum.DISCORD_PERMISSION,
    accessRestrictionArgs: PermissionsBitField.Flags.ManageMessages,
    name: "react",
    help_string: "- react <channelId> <messageId> <emoji>",
    run: async (msg, argv, cl) => {
        try {
            const [channelId, messageId, emoji] = argv;

            if (!channelId || !messageId || !emoji) {
                return msg.reply("Usage: react <channelId> <messageId> <emoji>").catch(() => {});
            }

            const channel = await cl.channels.fetch(channelId);
            const message = await channel.messages.fetch(messageId);

            await message.react(emoji);

            msg.reply("Reacted ✅").catch(() => {});
        } catch (err) {
            console.error(err);

            msg.reply(`❌ Failed:\n\`\`\`\n${err.stack}\n\`\`\``).catch(() => {});
        }
    }
};
