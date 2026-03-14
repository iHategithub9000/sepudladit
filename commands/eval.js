const { RestrictionsEnum } = require("../commandAccessRestrictions.js");

const { EmbedBuilder } = require('discord.js');

module.exports = {
    accessRestriction: RestrictionsEnum.USER_ID,
    accessRestrictionArgs: "836012649959522384",
    name: "eval",
    help_string: "<code> - Evaluates JavaScript code. Only usable by the bot owner.",
    run: async (msg, argv, cl) => {
        try {
            const result = eval(argv.slice(1).join(" "));
            const embed = new EmbedBuilder()
            .setTitle(":white_check_mark: Code executed.")
            .setDescription(`\`\`\`${result}\`\`\``)
            .setColor(0x00ff00)
            await msg.reply({embeds:[embed]})
        } catch (e) {
            const embed = new EmbedBuilder()
            .setTitle(":x: Code execution failed.")
            .setDescription(`\`\`\`${e.stack}\`\`\``)
            .setColor(0xff0000)
            await msg.reply({embeds:[embed]})
        }
    }
}