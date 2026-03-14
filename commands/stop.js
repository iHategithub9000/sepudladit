const { RestrictionsEnum } = require("../commandAccessRestrictions.js");

const { EmbedBuilder } = require('discord.js');

module.exports = {
    accessRestriction: RestrictionsEnum.USER_ID,
    accessRestrictionArgs: "836012649959522384",
    name: "stop",
    help_string: "- Turns bot off. Only usable by the bot owner.",
    run: async (msg, argv, cl) => {
        process.exit(0);
    }
}