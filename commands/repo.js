const { RestrictionsEnum } = require("../commandAccessRestrictions.js");

const { EmbedBuilder } = require('discord.js');

module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: "",
    name: "repo",
    help_string: "- Sends bot GitHub repository link",
    run: async (msg, argv, cl) => {
        msg.reply(`https://github.com/iHategithub9000/kstetodc`)
    }
}
