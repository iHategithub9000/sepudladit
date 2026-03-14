const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder, PresenceUpdateStatus } = require('discord.js');

module.exports = {
    accessRestriction: RestrictionsEnum.USER_ID,
    accessRestrictionArgs: "836012649959522384",
    name: "status",
    help_string: "<status> - Changes the bot's status. Only usable by the bot owner.",
    run: async (msg, argv, cl) => {
        const result = argv.slice(1).join(" ");
        const embed = new EmbedBuilder()
        .setTitle(":white_check_mark: Status changed!")
        await msg.reply({embeds:[embed]})
        cl.user.setPresence({
            status: PresenceUpdateStatus.Online,
            activities: [
              {
                name: result,
                type: 4
              }
            ]
        });
    }
}