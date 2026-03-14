const { RestrictionsEnum } = require("../commandAccessRestrictions.js");

const { EmbedBuilder } = require('discord.js');

module.exports = {
    accessRestriction: RestrictionsEnum.USER_ID,
    accessRestrictionArgs: "836012649959522384",
    name: "leave",
    help_string: "- Makes the bot leave the server. Only usable by the bot owner.",
    run: async (msg, argv, cl) => {
        await msg.guild.leave();
    }
}