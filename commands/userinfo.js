const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder, PresenceUpdateStatus } = require('discord.js');

module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: "",
    name: "userinfo",
    help_string: "- Displays information about a user.",
    run: async (msg, argv, cl) => {
        const user = msg.mentions.users.first() || msg.author;
        const gm = await msg.guild.members.fetch(user.id).catch(() => null);
        const embed = new EmbedBuilder()
            .setTitle(`User Information - ${user.username}`)
            .setDescription(`ID: ${user.id}\nCreated At: ${user.createdAt.toDateString()}\nAvatar: ${user.displayAvatarURL() ? `[Link](${user.displayAvatarURL()})` : "None"}\nBot: ${user.bot}\nDiscriminator: ${user.discriminator}\nDefault Avatar: ${user.defaultAvatarURL ? `[Link](${user.defaultAvatarURL})` : "None"}\nBanner: ${user.bannerURL() ? `[Link](${user.bannerURL()})` : "None"}\nHex accent color: ${user.hexAccentColor}\nTag: ${user.tag}\nSystem: ${user.system}\nBanner: ${user.banner}\nPrimary Guild ID: ${user.primaryGuildId}\nUsername: ${user.username}\nGlobal Name: ${user.globalName || "None"}\nFlags: ${user.flags.toArray().join(", ") || "None"}\nDisplay name: ${user.displayName || "None"}\nBannable: ${gm ? gm.bannable : "N/A"}\nKickable: ${gm ? gm.kickable : "N/A"}\nRoles: ${gm ? gm.roles.cache.map(r => r.name).join(", ") : "N/A"}\nPermissions: ${gm ? gm.permissions.toArray().join(", ") : "N/A"}\nManagable: ${gm ? gm.manageable : "N/A"}\nModeratable: ${gm ? gm.moderatable : "N/A"}\nCommunication Disabled Until: ${gm ? (gm.communicationDisabledUntil ? gm.communicationDisabledUntil.toDateString() : "None") : "N/A"}\nDisplay Hex Color: ${gm.displayHexColor}\nJoined At: ${gm ? gm.joinedAt.toDateString() : "N/A"}\nNickname: ${gm ? gm.nickname || "None" : "N/A"}\nPremium Since: ${gm ? (gm.premiumSince ? gm.premiumSince.toDateString() : "None") : "N/A"}\n`)
            .setColor(0x00ff00)
            .setFooter({ text: `User ID: ${user.id}` });
        msg.reply({ embeds: [embed] });
    }
}
