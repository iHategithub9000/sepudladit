const { RestrictionsEnum } = require("../commandAccessRestrictions.js");

const { EmbedBuilder } = require('discord.js');

module.exports = {
    accessRestriction: RestrictionsEnum.USER_ID,
    accessRestrictionArgs: "836012649959522384",
    name: "invite",
    help_string: "- Generates bot invite link. Only usable by the bot owner.",
    run: async (msg, argv, cl) => {
        msg.reply(`https://discord.com/oauth2/authorize?client_id=${cl.application.id}&permissions=8&integration_type=0&scope=bot+applications.commands`)
    }
}
