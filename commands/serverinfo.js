const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder, PresenceUpdateStatus } = require('discord.js');

module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: "",
    name: "serverinfo",
    help_string: "- Displays information about the server.",
    run: async (msg, argv, cl) => {
        const server = msg.guild;
        const embed = new EmbedBuilder()
            .setTitle(`Server Information - ${server.name}`)
            .setDescription(`Owner: ${server.ownerId}\nMembers: ${server.memberCount}\nCreated At: ${server.createdAt.toDateString()}\nEmote count: ${server.emojis.cache.size}\nRole count: ${server.roles.cache.size}\nSticker count: ${server.stickers.cache.size}\nChannel count: ${server.channels.cache.size}\nIcon: ${server.iconURL() ? `[Link](${server.iconURL()})` : "None"}\nDescription: ${server.description || "None"}\nBoost Tier: ${server.premiumTier ? `Tier ${server.premiumTier}` : "None"}\nBoost Count: ${server.premiumSubscriptionCount}\nVanity URL: ${server.vanityURLCode ? `[Link](${server.vanityURLCode})` : "None"}\nVerification Level: ${["None", "Low", "Medium", "High", "Very High"][server.verificationLevel]}\nSoundboard Sounds: ${server.soundboardSounds.cache.size}`)
            .setColor(0x00ff00)
            .setFooter({ text: `Server ID: ${server.id}` });
        msg.reply({ embeds: [embed] });
    }
}
