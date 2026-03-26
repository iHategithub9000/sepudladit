const { RestrictionsEnum } = require("../commandAccessRestrictions.js");

const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: "",
    name: "suicide",
    help_string: "- Times you out for the maximum amount of time possible in the Discord API.",
    run: async (msg, argv, cl) => {
        try {
          await msg.member.timeout(2419200*1000);
          await msg.reply("There you go!");
        } catch (e) {
            const embed = new EmbedBuilder()
                .setTitle(":x: Timeout failed.")
                .setDescription(`\`\`\`${e.stack}\`\`\``)
                .setColor(0xff0000);
            await msg.reply({ embeds: [embed] });
        }
    }
}
