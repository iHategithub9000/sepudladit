const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { exec } = require("child_process");

module.exports = {
    accessRestriction: RestrictionsEnum.DISCORD_PERMISSION,
    accessRestrictionArgs: PermissionsBitField.Flags.ManageMessages,
    name: "say",
    help_string: "<message> - Makes bot say something. Requires Manage Messages permission.",
    run: async (msg, argv, cl) => {
        const smsg = argv.slice(1).join(" ");
        msg.delete().catch(() => {});
        msg.channel.send(smsg).catch(() => {});
    }
};